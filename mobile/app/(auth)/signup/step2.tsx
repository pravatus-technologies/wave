import { View, Text } from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ImageButton, FormInput } from '@components/controls';
import * as regex from '@constants/regex';
import { useTheme, useTranslation } from '@context';
import { AppIcon } from 'src/components';

export interface ILoginData {
  username: string;
  password: string;
}

export interface ILoginDataValid {
  username: boolean;
  password: boolean;
}

export default function SignupStep2(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const [loginData, setLoginData] = useState<ILoginData>({
    username: '',
    password: '',
  });

  const [isValild, setIsValid] = useState<ILoginDataValid>({
    username: false,
    password: false,
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
      username: regex.username.test(loginData.username),
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
          placeholder={t('Username')}
          hint="@Username"
          placeholderTextColor={colors.hint}
          autoCapitalize="none"
          autoCorrect={false}
          iconColor={colors.icon}
          inputStyle={{ height: sizes.inputHeight, fontSize: sizes.text }}
          containerStyle={{ marginVertical: sizes.s / 2 }}
          onChangeText={text => handleChange({ username: text })}
          hasError={!isValild.username && loginData.username.length > 1}
          errorMessage={t('Enter a valid username')}
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
      </View>
    </SafeAreaView>
  );
}
