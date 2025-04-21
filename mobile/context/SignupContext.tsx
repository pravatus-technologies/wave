import React, { createContext, useCallback, useContext, useState } from 'react';

interface SignupData {
  email: string;
  password: string;
  givenNames: string;
  lastName: string;
  birthday: string;
  isAgreedToTerms: boolean;
  pictureUri: string | null;
}

interface SignupContextType {
  data: SignupData;
  setSignupData: (updates: Partial<SignupData>) => void;
}

const defaultData: SignupData = {
  email: '',
  password: '',
  givenNames: '',
  lastName: '',
  birthday: '',
  isAgreedToTerms: false,
  pictureUri: '',
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SignupData>(defaultData);

  const setSignupData = useCallback((updates: Partial<SignupData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <SignupContext.Provider value={{ data, setSignupData }}>{children}</SignupContext.Provider>
  );
};

export const useSignup = (): SignupContextType => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};
