import { Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormInput, LinkButton } from '@components/controls';
import FormDateInput from '@components/controls/FormDateInput';
import ImageButton from '@components/controls/ImageButton';
import * as regex from '@constants/regex';
import { IPersonalDetails } from '@constants/types/interfaces/IPersonalDetails';
import { useTheme, useTranslation } from '@context';
import { isOfLegalAge } from '@utils/helpers';
import { AppIcon } from 'src/components';

interface IPersonalDetailsValidation {
  givenName: boolean;
  lastName: boolean;
  birthday: boolean;
  legalAge: boolean;
}

export default function SignupStep1(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const [personalData, setPersonalData] = useState<IPersonalDetails>({
    givenName: '',
    lastName: '',
    birthday: '',
  });

  const [isValid, setIsValid] = useState<IPersonalDetailsValidation>({
    givenName: false,
    lastName: false,
    birthday: false,
    legalAge: false,
  });

  const handleChange = (value: Partial<IPersonalDetails>): void => {
    setPersonalData(prev => ({ ...prev, ...value }));
  };

  const handleNavigateBack = (): void => {
    router.back();
  };

  useEffect(() => {
    setIsValid(state => ({
      ...state,
      givenName: regex.name.test(personalData.givenName),
      lastName: regex.name.test(personalData.lastName),
      birthday: regex.date.test(personalData.birthday),
      legalAge: regex.date.test(personalData.birthday) && isOfLegalAge(personalData.birthday),
    }));
  }, [personalData, setIsValid]);

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
          {t('Tell us about you')}
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: sizes.h5, marginTop: sizes.s }}>
          {t('We need to make sure to get this right')}
        </Text>
      </View>
      {/* form container */}
      <View style={{ padding: sizes.padding, marginTop: sizes.s }}>
        <FormInput
          placeholder={t('Given names')}
          placeholderTextColor={colors.hint}
          autoCapitalize="words"
          autoCorrect={false}
          iconColor={colors.icon}
          inputStyle={{ height: sizes.inputHeight, fontSize: sizes.text }}
          containerStyle={{ marginVertical: sizes.s / 2 }}
          onChangeText={text => handleChange({ givenName: text })}
        />
        <FormInput
          placeholder={t('Last name')}
          placeholderTextColor={colors.hint}
          autoCapitalize="words"
          autoCorrect={false}
          iconColor={colors.icon}
          inputStyle={{ height: sizes.inputHeight, fontSize: sizes.text }}
          containerStyle={{ marginVertical: sizes.s / 2 }}
          onChangeText={text => handleChange({ lastName: text })}
        />
        <FormDateInput
          hint={t('Birthday')}
          showCalendar={true}
          value={personalData.birthday}
          containerStyle={{ marginVertical: sizes.s / 2 }}
          inputStyle={{ height: sizes.inputHeight, fontSize: sizes.text }}
          onChangeText={text => handleChange({ birthday: text })}
        ></FormDateInput>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: sizes.m,
          }}
        >
          <LinkButton style={{ paddingRight: sizes.sm }} onPress={() => console.log(`link button`)}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>I have an account</Text>
          </LinkButton>
          <LinkButton
            disabled={Object.values(isValid).includes(false)}
            onPress={() => console.log(`${JSON.stringify(isValid)}`)}
          >
            <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>Next</Text>
          </LinkButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
