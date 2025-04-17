// hooks/useAuth.tsx
import { SafeAreaView, Text } from 'react-native';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as Sentry from '@sentry/react-native';
import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

import { Logger } from '@utils/Logger';

import { API } from '../constants';
import { AuthContextType } from '../constants/types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
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

/***
 *
 * Wrapping all functions inside a useCallback as suggested since we're passing these functions down
 * to child components which means they would be recreated every render.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    if (user) {
      Sentry.setUser({ id: user.uid });
    } else {
      Sentry.setUser(null);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  const facebookSignin = useCallback(async (): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining the access token';
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      Logger.error(error, 'handleFacebookSignin', 'An error occurred trying to login to Facebook.');
      throw error;
    }
  }, []);

  /**
   * Creates a new user with an email and password.
   *
   * This method also signs the user in once the account has been created.
   *
   * #### Example
   *
   * ```js
   * const userCredential = await firebase.auth().createUserWithEmailAndPassword('joe.bloggs@example.com', '123456');
   * ```
   *
   * @error auth/email-already-in-use Thrown if there already exists an account with the given email address.
   * @error auth/invalid-email Thrown if the email address is not valid.
   * @error auth/operation-not-allowed Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
   * @error auth/weak-password Thrown if the password is not strong enough.
   * @param email The users email address.
   * @param password The users password.
   */
  const registerUserWithEmail = useCallback(
    async (
      email: string,
      password: string,
      displayName: string,
      avatarUrl?: string
    ): Promise<FirebaseAuthTypes.UserCredential> => {
      try {
        const userCred = await auth().createUserWithEmailAndPassword(email, password);
        if (userCred.user) await userCred.user.updateProfile({ displayName, photoURL: avatarUrl });

        setUser(auth().currentUser);

        await axios.post(`${API.endpoints.newRegistration}`);

        return userCred;
      } catch (error) {
        await Logger.error(error, 'registerUserWithEmail', 'Unable to register user');
        throw error;
      }
    },
    []
  );

  /**
   * Signs a user in with an email and password.
   *
   * #### Example
   *
   * ```js
   * const userCredential = await firebase.auth().signInWithEmailAndPassword('joe.bloggs@example.com', '123456');
   * ````
   * @error auth/invalid-email Thrown if the email address is not valid.
   * @error auth/user-disabled Thrown if the user corresponding to the given email has been disabled.
   * @error auth/user-not-found Thrown if there is no user corresponding to the given email.
   * @error auth/wrong-password Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
   * @param email The users email address.
   * @param password The users password.
   */
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
      setUser(null);
    } catch (error) {
      await Logger.error(error, 'logout', 'Unable to logout');
      throw error;
    }
  }, []);

  // reset password
  const resetPassword = useCallback(async (email: string): Promise<void> => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      await Logger.error(error, 'resetPassword', 'Unable to reset password');
      throw error;
    }
  }, []);

  // update profile
  const updateProfile = useCallback(
    async (updates: { displayName?: string; photoURL?: string }): Promise<void> => {
      if (auth().currentUser) {
        try {
          await auth().currentUser?.updateProfile(updates);
          setUser(auth().currentUser);
        } catch (error) {
          await Logger.error(error, 'updateProfile', 'Unable to update profile');
          throw error;
        }
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
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
