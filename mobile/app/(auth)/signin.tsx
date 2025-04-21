import { Alert, Image, View } from 'react-native';

import { Redirect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import {
  AppText,
  FormButton,
  FormInput,
  ImageButton,
  LinkButton,
  Screen,
} from '@components/controls';
import * as regex from '@constants';
import { AuthErrorCodes } from '@constants';
import { FirebaseAuthError, ILogin, ILoginValidation } from '@constants/types/interfaces';
import { useAuth, useTheme, useTranslation } from '@context';
import Logger from '@utils/Logger';

import wave from '../../assets/images/wave.png';

export default function Signin(): JSX.Element {
  const { colors, sizes, assets } = useTheme();
  const { user, loginWithEmail, facebookSignin } = useAuth();
  const { t } = useTranslation();
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

  const handleCreateAccount = (): void => {
    router.push('/signup');
  };

  const handleFacebookSignin = async (): Promise<void> => {
    try {
      setBusy(true);
      await facebookSignin();
    } catch (error) {
      Logger.error(error, 'handleFacebookSignin', 'Unable to login to Facebook');
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
    <Screen>
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
            placeholder={t('Email')}
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
            placeholder={t('Password')}
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
            title={t('Login')}
            onPress={handleSignin}
          />
          <LinkButton
            containerStyle={{
              marginTop: sizes.base / sizes.multiplier,
              alignItems: 'center',
            }}
            onPress={() => Alert.alert('Forgot password!')}
          >
            <AppText>I forgot my password</AppText>
          </LinkButton>
          <FormButton
            containerStyle={{ marginTop: sizes.l }}
            outline={true}
            title={t('Create an account')}
            onPress={handleCreateAccount}
          />
        </View>
      </View>
      {/* Bottom Section */}
      <View style={{ flex: 0.25 }}>
        <View style={{ marginTop: sizes.s, alignItems: 'center' }}>
          <AppText p>{t('or use your social media accounts')}</AppText>
        </View>
        <View
          style={{
            marginTop: sizes.l,
            marginHorizontal: sizes.l,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <ImageButton onPress={() => Alert.alert(`X Logo clicked`)}>
            <Image source={assets.xLogo} style={{ height: 24, width: 24, resizeMode: 'contain' }} />
          </ImageButton>
          <ImageButton onPress={handleFacebookSignin}>
            <Image
              source={assets.fbLogo}
              style={{ height: 24, width: 24, resizeMode: 'contain' }}
            />
          </ImageButton>
          <ImageButton onPress={() => Alert.alert(`Google clicked`)}>
            <Image
              source={assets.googleLogo}
              style={{ height: 24, width: 24, resizeMode: 'contain' }}
            />
          </ImageButton>
        </View>
      </View>
    </Screen>
  );
}
