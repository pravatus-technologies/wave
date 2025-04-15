import {
  Platform,
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { Redirect, useRouter } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';

import { PVActionButton, PVFormInput } from '@components/presentational';
import * as regex from '@constants/regex';
import { AuthErrorCodes, FirebaseAuthError, ILogin, ILoginValidation } from '@constants/types';
import { useAuth, useData, useTheme } from '@context';

export default function Signin(): JSX.Element {
  const { isDark } = useData();
  const { colors, assets, sizes } = useTheme();
  const { user, loginWithEmail } = useAuth();
  const router = useRouter();

  const [busy, setBusy] = useState(false);

  const [login, setLoginData] = useState<ILogin>({
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: false,
  });

  const handleChange = useCallback((value: Partial<ILogin>) => {
    setLoginData(prev => ({ ...prev, ...value }));
  }, []);

  const handleSignin = useCallback(async () => {
    try {
      setBusy(true);
      await loginWithEmail(login.email, login.password);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong. Please try again';
      const err = error as FirebaseAuthError;
      switch (err.code) {
        case AuthErrorCodes.INVALID_CREDENTIAL:
          errorMessage = 'Your login has expired or is invalid.';
          break;
        case AuthErrorCodes.USER_NOT_FOUND:
          errorMessage = 'No user found with that email.';
          break;
        case AuthErrorCodes.WRONG_PASSWORD:
          errorMessage = 'Incorrect password.';
          break;
        case AuthErrorCodes.NETWORK_FAILED:
          errorMessage = 'Network error. Check your connection.';
          break;
      }

      Alert.alert('Login Error', errorMessage);
    } finally {
      setBusy(false);
    }
  }, [login, loginWithEmail]);

  useEffect(() => {
    setIsValid({
      email: regex.email.test(login.email),
      password: true, // you can update this if needed
    });
  }, [login]);

  if (user) return <Redirect href="/" />;

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View
        style={{
          margin: 'auto',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: sizes.height * 0.15,
        }}
      >
        <Image source={assets.logo} style={{ width: 64, height: 64 }} />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={60}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <PVFormInput
            autoCapitalize="none"
            placeholder="Email"
            icon="MailIcon"
            value={login.email}
            onChangeText={(text: string) => handleChange({ email: text })}
          />
          <PVFormInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            icon="Lock"
            value={login.password}
            onChangeText={(text: string) => handleChange({ password: text })}
          />
          <PVActionButton
            title="Sign In"
            onPress={handleSignin}
            loading={busy}
            disabled={!isValid.email || !isValid.password}
            buttonStyle={{ backgroundColor: colors.primary, marginTop: 16 }}
            spinnerColor={colors.white}
          />
        </ScrollView>
        <View style={styles.footer}>
          <PVActionButton
            title="Create an account"
            onPress={() => router.push('/signup')}
            textColor={colors.primary}
            buttonStyle={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: isDark ? colors.gray : colors.primary,
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});
