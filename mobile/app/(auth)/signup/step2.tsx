import { View, Text } from 'react-native';

import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ImageButton, FormInput, LinkButton } from '@components/controls';
import FormCheckbox from '@components/controls/FormCheckbox';
import * as regex from '@constants/regex';
import { useTheme, useTranslation } from '@context';
import { AppIcon } from 'src/components';

export interface ILoginData {
  email: string;
  password: string;
  isAgreedToTerms: boolean;
}

export interface ILoginDataValid {
  email: boolean;
  password: boolean;
  isAgreedToTerms: boolean;
}

export default function SignupStep2(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
    isAgreedToTerms: false,
  });

  const [isValid, setIsValid] = useState<ILoginDataValid>({
    email: false,
    password: false,
    isAgreedToTerms: false,
  });

  const [touched, setTouched] = useState({
    isAgreedToTerms: false,
  });

  const [fieldDirty, setFieldDirty] = useState({
    email: false,
  });

  const handleChange = (value: Partial<ILoginData>): void => {
    setLoginData(prev => ({ ...prev, ...value }));
  };

  const handleNavigateBack = (): void => {
    router.back();
  };

  useEffect(() => {
    setIsValid(state => ({
      ...state,
      email: regex.email.test(loginData.email),
      password: regex.password.test(loginData.password),
    }));
  }, [loginData, setIsValid]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, padding: sizes.padding }}>
      {/* header back button container */}
      <View
        style={{
          alignItems: 'flex-start',
          marginHorizontal: -3,
        }}
      >
        <ImageButton onPress={handleNavigateBack}>
          <AppIcon name="ChevronLeft" size={sizes.m} color={colors.text} />
        </ImageButton>
      </View>
      {/* header title container */}
      <View style={{ padding: sizes.padding }}>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: sizes.h1 }}>
          {t('Create your account')}
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: sizes.h5, marginTop: sizes.s }}>
          {t('Create a username and password')}
        </Text>
      </View>
      {/* form container */}
      <View style={{ padding: sizes.padding, marginTop: sizes.s }}>
        <FormInput
          placeholder={t('Email')}
          placeholderTextColor={colors.hint}
          autoCapitalize="none"
          autoCorrect={false}
          iconColor={colors.icon}
          inputStyle={{ height: sizes.inputHeight, fontSize: sizes.text }}
          containerStyle={{ marginVertical: sizes.s / 2 }}
          onChangeText={text => {
            setFieldDirty({ email: true });
            handleChange({ email: text });
          }}
          hasError={!isValid.email && fieldDirty.email && loginData.email.length > 2}
          errorMessage={t('Enter a valid email')}
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FormCheckbox
            value={loginData.isAgreedToTerms}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onValueChange={(value: boolean) => {
              setTouched(prev => ({ ...prev, isAgreedToTerms: true }));
              handleChange({ isAgreedToTerms: value });
              setIsValid(prev => ({ ...prev, isAgreedToTerms: value }));
            }}
            label={t('I agree to the Terms and Service')}
            hasError={touched.isAgreedToTerms && !isValid.isAgreedToTerms}
            errorMessage={t('You must agree to continue')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: sizes.m,
          }}
        >
          <LinkButton style={{ paddingRight: sizes.sm }} onPress={handleNavigateBack}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>I have an account</Text>
          </LinkButton>
          <LinkButton
            disabled={Object.values(isValid).includes(false)}
            onPress={() => router.replace('/signup/step3/')}
          >
            <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>Next</Text>
          </LinkButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
