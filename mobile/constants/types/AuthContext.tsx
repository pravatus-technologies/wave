import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { IProfile } from '@constants/types/interfaces';

import { ISignupData } from './interfaces/ISignupData';

export type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  profile: IProfile | null;
  facebookSignin: () => Promise<FirebaseAuthTypes.UserCredential>;
  registerUserWithEmail: (data: ISignupData) => Promise<FirebaseAuthTypes.UserCredential>;
  loginWithEmail: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<IProfile & { pictureUri?: string }>) => Promise<void>;
};
