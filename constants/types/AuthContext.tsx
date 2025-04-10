import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  registerUserWithEmail: (
    email: string,
    password: string,
    displayName: string,
    avatarUrl?: string
  ) => Promise<FirebaseAuthTypes.UserCredential>;
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<FirebaseAuthTypes.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
};
