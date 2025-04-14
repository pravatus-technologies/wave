// hooks/useAuth.tsx
import React, { useContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import axios from "axios";

import { API } from "../constants";
import { AuthContextType } from "../constants/types";
import { SafeAreaView, Text } from "react-native";
import { Logger } from "@/utils/Logger";

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  initializing: true,
  registerUserWithEmail: async () => {
    throw new Error("registerUserWithEmail not implemented");
  },
  loginWithEmail: async () => {
    throw new Error("loginWithEmail not implemented");
  },
  logout: async () => {
    throw new Error("logout not implemented");
  },
  resetPassword: async () => {
    throw new Error("resetPassword not implemented");
  },
  updateProfile: async () => {
    throw new Error("updateProfile not implemented");
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  // takes the created Firebase user and register it in the backend
  const registerUserWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    avatarUrl?: string
  ) => {
    try {
      const userCred = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (userCred.user)
        await userCred.user.updateProfile({ displayName, photoURL: avatarUrl });

      setUser(auth().currentUser);

      await axios.post(`${API.endpoints.newRegistration}`);

      return userCred;
    } catch (error) {
      await Logger.error(
        error,
        "registerUserWithEmail",
        "Unable to register user"
      );
      throw error;
    }
  };

  // login with email/password
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      setUser(userCredential.user);

      return userCredential;
    } catch (error) {
      await Logger.error(error, "loginWithEmail", "Unable to login");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      await Logger.error(error, "logout", "Unable to logout");
      throw error;
    }
  };

  // reset password
  const resetPassword = async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      await Logger.error(error, "resetPassword", "Unable to reset password");
      throw error;
    }
  };

  // update profile
  const updateProfile = async (updates: {
    displayName?: string;
    photoURL?: string;
  }) => {
    if (auth().currentUser) {
      try {
        await auth().currentUser?.updateProfile(updates);
        setUser(auth().currentUser);
      } catch (error) {
        await Logger.error(error, "updateProfile", "Unable to update profile");
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
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

export const useAuth = () => useContext(AuthContext);
