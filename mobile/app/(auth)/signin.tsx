import { Alert, Text, Image, View } from 'react-native';

import { Redirect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormButton, FormInput } from '@components/controls';
import { LinkButton } from '@components/controls/LinkButton';
import * as regex from '@constants';
import { AuthErrorCodes } from '@constants';
import { FirebaseAuthError, ILogin, ILoginValidation } from '@constants/types/interfaces';
import { useAuth, useTheme } from '@context';
import Logger from '@utils/Logger';

import wave from '../../assets/images/wave.png';

export default function Signin(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { user, loginWithEmail } = useAuth();
  // const router = useRouter();

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

  const handleSignin = async (): Promise<void> => {
    try {
      setBusy(true);
      await loginWithEmail(login.email, login.password);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong. Please try again';
      const err = error as FirebaseAuthError;
      switch (err.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          errorMessage = 'Please enter a valid email address.';
          break;
        case AuthErrorCodes.USER_DISABLED:
          errorMessage = 'This account has been disabled. Please contact support.';
          break;
        case AuthErrorCodes.USER_NOT_FOUND:
          errorMessage = "We couldn't find an account with that email.";
          break;
        case AuthErrorCodes.WRONG_PASSWORD:
          errorMessage = 'Incorrect password. Please try again or reset your password.';
          break;
        case AuthErrorCodes.INVALID_CREDENTIAL:
          errorMessage = 'Invalid credentials. Please try again.';
          break;
        default:
          errorMessage = 'An unkonwn error has occured.';
          Logger.error(err, 'handleSignin', err.message);
      }

      Alert.alert('Login Error', errorMessage);
    } finally {
      setBusy(false);
    }
  };

  const handleCreateAccount = async (): Promise<void> => {
    try {
      setBusy(true);
    } catch (error: unknown) {
      let errorMessage = 'something went wrong. Please try again.';
      const err = error as FirebaseAuthError;
      switch (err.code) {
        case AuthErrorCodes.EMAIL_ALREADY_IN_USE:
          errorMessage =
            'This email is already registered. Try logging in or use a different email.';
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          errorMessage = 'Please enter a valid email address.';
          break;
        case AuthErrorCodes.OPERATION_NOT_ALLOWED:
          errorMessage = 'Account creation is currently disabled. Please contact support for help.';
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          errorMessage = 'Your password is too weak. Please use at least 6 characters.';
          break;
        default:
          errorMessage = 'Unknown error.';
          Logger.error(err, 'handleCreateAccount', err.message);
      }

      Alert.alert('error ', errorMessage);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    setIsValid({
      email: regex.email.test(login.email),
      password: true, // you can update this if needed
    });
  }, [login]);

  if (user) return <Redirect href="/" />;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: sizes.padding }}
    >
      {/* Top Section */}
      <View
        style={{
          flex: 0.33,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image source={wave} />
      </View>
      {/* Form Section */}
      <View style={{ flex: 0.55 }}>
        <View>
          <FormInput
            placeholder="Username"
            placeholderTextColor={colors.hint}
            autoCapitalize="none"
            autoCorrect={false}
            iconColor={colors.icon}
            inputStyle={{ height: sizes.inputHeight, fontSize: sizes.text }}
            containerStyle={{ marginVertical: sizes.s / 2 }}
            onChangeText={text => handleChange({ email: text })}
          />
          <FormInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={colors.hint}
            autoCapitalize="none"
            autoCorrect={false}
            iconColor={colors.icon}
            inputStyle={{ height: sizes.inputHeight, fontSize: sizes.text }}
            containerStyle={{ marginVertical: sizes.s / 2 }}
            onChangeText={text => handleChange({ password: text })}
          />
          <FormButton
            loading={busy}
            disabled={!isValid || busy}
            title={'Login'}
            onPress={handleSignin}
          />
          <LinkButton
            containerStyle={{
              marginTop: sizes.base / sizes.multiplier,
              alignItems: 'center',
            }}
            onPress={() => Alert.alert('Forgot password!')}
          >
            <Text>I forgot my password</Text>
          </LinkButton>
          <FormButton
            containerStyle={{ marginTop: sizes.l }}
            outline={true}
            title={'Create an account'}
            onPress={handleCreateAccount}
          />
        </View>
      </View>
      {/* Bottom Section */}
      <View style={{ flex: 0.25, backgroundColor: 'yellow' }} />
    </SafeAreaView>
  );
}
