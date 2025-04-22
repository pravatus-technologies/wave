import { SafeAreaView, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as Sentry from '@sentry/react-native';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

import { IProfile } from '@constants/types/interfaces';
import { ISignupData } from '@constants/types/interfaces/ISignupData';
import { Logger } from '@utils/Logger';

import { AuthContextType } from '../constants/types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
  profile: null,
  facebookSignin: async () => {
    throw new Error('facebookSignin not implemented');
  },
  registerUserWithEmail: async () => {
    throw new Error('registerUserWithEmail not implemented');
  },
  loginWithEmail: async () => {
    throw new Error('loginWithEmail not implemented');
  },
  logout: async () => {
    throw new Error('logout not implemented');
  },
  resetPassword: async () => {
    throw new Error('resetPassword not implemented');
  },
  updateProfile: async () => {
    throw new Error('updateProfile not implemented');
  },
});

const USER_PROFILE_KEY = 'userProfile';
const PROFILE_LAST_SYNC_KEY = 'userProfileLastSynced';
const PROFILE_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    if (user) Sentry.setUser({ id: user.uid });
    else Sentry.setUser(null);
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      const initializeProfile = async (): Promise<void> => {
        setUser(currentUser);

        if (!currentUser) {
          await AsyncStorage.multiRemove([USER_PROFILE_KEY, PROFILE_LAST_SYNC_KEY]);
          setProfile(null);
          setInitializing(false);
          return;
        }

        try {
          const [cached, lastSyncedStr] = await AsyncStorage.multiGet([
            USER_PROFILE_KEY,
            PROFILE_LAST_SYNC_KEY,
          ]);
          const now = Date.now();
          const lastSynced = lastSyncedStr[1] ? parseInt(lastSyncedStr[1], 10) : 0;

          if (cached[1] && now - lastSynced < PROFILE_CACHE_TTL) {
            setProfile(JSON.parse(cached[1]));
          } else {
            const doc = await firestore().collection('users').doc(currentUser.uid).get();
            if (doc.exists) {
              const freshProfile = doc.data() as IProfile;
              await AsyncStorage.multiSet([
                [USER_PROFILE_KEY, JSON.stringify(freshProfile)],
                [PROFILE_LAST_SYNC_KEY, now.toString()],
              ]);
              setProfile(freshProfile);
            } else {
              setProfile(null);
            }
          }
        } catch (error) {
          await Logger.error(error, 'initializeProfile', 'Failed to load user profile');
          setProfile(null);
        } finally {
          setInitializing(false);
        }
      };

      void initializeProfile();
    });

    return unsubscribe;
  }, []);

  const facebookSignin = useCallback(async (): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) throw 'User cancelled the login process';

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) throw 'Something went wrong obtaining the access token';

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      Logger.error(
        error,
        'handleFacebookSignin',
        `An error occurred trying to login to Facebook. ${JSON.stringify(error)}`
      );
      throw error;
    }
  }, []);

  const registerUserWithEmail = useCallback(
    async (signupData: ISignupData): Promise<FirebaseAuthTypes.UserCredential> => {
      const { email, password, givenNames, lastName, birthday, isAgreedToTerms, pictureUri } =
        signupData;
      try {
        const userCred = await auth().createUserWithEmailAndPassword(email, password);
        let photoURL = '';

        if (pictureUri && userCred.user?.uid && pictureUri.startsWith('file://')) {
          try {
            const uploadRef = storage().ref(`avatars/${userCred.user.uid}.jpg`);
            await uploadRef.putFile(pictureUri);
            photoURL = await uploadRef.getDownloadURL();
          } catch (error) {
            const err = error as Error;
            Logger.error(err, 'registerUserEmail', err.message);
          }
        }

        if (userCred.user) {
          await userCred.user.updateProfile({ displayName: givenNames, photoURL });

          const fullProfile: IProfile = {
            email,
            givenNames,
            lastName,
            birthday,
            isAgreedToTerms,
            pictureUri: photoURL,
          };

          await firestore()
            .collection('users')
            .doc(userCred.user.uid)
            .set({
              ...fullProfile,
              uid: userCred.user.uid,
              createdAt: firestore.FieldValue.serverTimestamp(),
            });

          await AsyncStorage.multiSet([
            [USER_PROFILE_KEY, JSON.stringify(fullProfile)],
            [PROFILE_LAST_SYNC_KEY, Date.now().toString()],
          ]);
          setProfile(fullProfile);
        }

        setUser(userCred.user);
        return userCred;
      } catch (error) {
        await Logger.error(error, 'registerUserWithEmail', 'Unable to register user');
        throw error;
      }
    },
    []
  );

  const loginWithEmail = useCallback(
    async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        setUser(userCredential.user);
        return userCredential;
      } catch (error) {
        await Logger.error(error, 'loginWithEmail', 'Unable to login');
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await auth().signOut();
      await AsyncStorage.multiRemove([USER_PROFILE_KEY, PROFILE_LAST_SYNC_KEY]);
      setUser(null);
      setProfile(null);
    } catch (error) {
      await Logger.error(error, 'logout', 'Unable to logout');
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      await Logger.error(error, 'resetPassword', 'Unable to reset password');
      throw error;
    }
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<IProfile & { pictureUri?: string }>): Promise<void> => {
      const currentUser = auth().currentUser;
      if (!currentUser) return;

      let updatedPhotoUrl = profile?.pictureUri;
      if (updates.pictureUri?.startsWith('file://')) {
        const ref = storage().ref(`avatars/${currentUser.uid}.jpg`);
        await ref.putFile(updates.pictureUri);
        updatedPhotoUrl = await ref.getDownloadURL();
      }

      const mergedProfile: IProfile = {
        ...profile,
        ...updates,
        pictureUri: updatedPhotoUrl,
      };

      try {
        await firestore().collection('users').doc(currentUser.uid).update(mergedProfile);
        await AsyncStorage.multiSet([
          [USER_PROFILE_KEY, JSON.stringify(mergedProfile)],
          [PROFILE_LAST_SYNC_KEY, Date.now().toString()],
        ]);
        setProfile(mergedProfile);

        await currentUser.updateProfile({
          displayName: mergedProfile.givenNames,
          photoURL: updatedPhotoUrl,
        });
      } catch (error) {
        await Logger.error(error, 'updateProfile', 'Unable to update profile');
        throw error;
      }
    },
    [profile]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        profile,
        facebookSignin,
        registerUserWithEmail,
        loginWithEmail,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {initializing ? (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
