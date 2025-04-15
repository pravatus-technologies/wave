import {
  Pressable,
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';

import { PVActionButton, PVFormInput, PVFormToggle, PVIcon } from '@components/presentational';
import * as regex from '@constants/regex';
import { FirebaseAuthError } from '@constants/types';
import { useAuth, useData, useTheme } from '@context';
import { isOfLegalAge, isValidDateFormat } from '@utils/helpers';
import { Logger } from '@utils/Logger';

interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  agreeToTerms: boolean;
}

interface IRegisterValidation {
  email: boolean;
  password: boolean;
  firstName: boolean;
  lastName: boolean;
  birthday: boolean;
  isLegalAge: boolean;
  agreeToTerms: boolean;
}

export default function Signup(): JSX.Element {
  const navigation = useNavigation();
  const { colors, sizes, assets } = useTheme();
  const { registerUserWithEmail } = useAuth();
  const { isDark } = useData();
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [register, setRegisterData] = useState<IRegisterForm>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthday: '',
    agreeToTerms: false,
  });

  const [isValid, setIsValid] = useState<IRegisterValidation>({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    birthday: false,
    isLegalAge: false,
    agreeToTerms: false,
  });

  const handleChange = (value: Partial<IRegisterForm>): void => {
    setRegisterData(prev => ({ ...prev, ...value }));
  };

  const handleSignup = async (): Promise<void> => {
    try {
      setBusy(true);
      await registerUserWithEmail(register.email, register.password, register.firstName);
      router.replace('/');
    } catch (error: unknown) {
      const err = error as FirebaseAuthError;
      Logger.error(error, 'Signup', err.message);
    }
    setBusy(false);
  };

  useEffect(() => {
    setIsValid({
      email: regex.email.test(register.email),
      password: regex.password.test(register.password),
      firstName: regex.name.test(register.firstName),
      lastName: regex.name.test(register.lastName),
      birthday: isValidDateFormat(register.birthday) && isOfLegalAge(register.birthday),
      isLegalAge: isOfLegalAge(register.birthday),
      agreeToTerms: register.agreeToTerms,
    });
  }, [register, isValid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()} style={{ paddingHorizontal: 5 }}>
          <PVIcon name="ArrowLeft" size={24} color={colors.primary} />
        </Pressable>
      ),
    });
  }, [navigation, colors.primary]);

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
            value={register.email}
            onChangeText={(text: string) => handleChange({ email: text })}
          />
          <PVFormInput
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            icon="Lock"
            value={register.password}
            onChangeText={(text: string) => handleChange({ password: text })}
          />
          <PVFormInput
            autoCapitalize="words"
            placeholder="First Name"
            value={register.firstName}
            onChangeText={(text: string) => handleChange({ firstName: text })}
          />
          <PVFormInput
            autoCapitalize="words"
            placeholder="Last Name"
            value={register.lastName}
            onChangeText={(text: string) => handleChange({ lastName: text })}
          />
          <PVFormInput
            autoCapitalize="none"
            placeholder="Birthday (YYYY/MM/DD)"
            value={register.birthday}
            onChangeText={(text: string) => handleChange({ birthday: text })}
          />
          <PVFormToggle
            label="Agree to terms"
            value={register.agreeToTerms}
            onValueChange={v => handleChange({ agreeToTerms: v })}
          />
          <PVActionButton
            title="Sign Up"
            onPress={handleSignup}
            loading={busy}
            disabled={
              !isValid.email ||
              !isValid.password ||
              !isValid.firstName ||
              !isValid.lastName ||
              !isValid.isLegalAge ||
              !isValid.agreeToTerms
            }
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
