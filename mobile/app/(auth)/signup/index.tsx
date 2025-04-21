import { View } from 'react-native';

import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { AppText, FormInput, LinkButton, Screen } from '@components/controls';
import FormDateInput from '@components/controls/FormDateInput';
import ImageButton from '@components/controls/ImageButton';
import * as regex from '@constants/regex';
import { IPersonalDetails } from '@constants/types/interfaces/IPersonalDetails';
import { useTheme, useTranslation } from '@context';
import { useSignup } from '@context/SignupContext';
import { isOfLegalAge } from '@utils/helpers';
import { AppIcon } from 'src/components';

interface IPersonalDetailsValidation {
  givenNames: boolean;
  lastName: boolean;
  birthday: boolean;
  legalAge: boolean;
}

export default function SignupStep1(): JSX.Element {
  const { setSignupData } = useSignup();
  const { colors, sizes } = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const [personalData, setPersonalData] = useState<IPersonalDetails>({
    givenNames: '',
    lastName: '',
    birthday: '',
  });

  const [isValid, setIsValid] = useState<IPersonalDetailsValidation>({
    givenNames: false,
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
      givenNames: regex.name.test(personalData.givenNames),
      lastName: regex.name.test(personalData.lastName),
      birthday: regex.date.test(personalData.birthday),
      legalAge: regex.date.test(personalData.birthday) && isOfLegalAge(personalData.birthday),
    }));
  }, [personalData, setIsValid]);

  return (
    <Screen>
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
        <AppText h1>{t('Tell us about you')}</AppText>
        <AppText h5 style={{ marginTop: sizes.s }}>
          {t('We need to make sure to get this right')}
        </AppText>
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
          onChangeText={text => handleChange({ givenNames: text })}
          hasError={!isValid.givenNames && personalData.givenNames.length > 1}
          errorMessage={t('Enter a valid first name')}
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
          hasError={!isValid.lastName && personalData.lastName.length > 1}
          errorMessage={t('Enter a valid last name')}
        />
        <FormDateInput
          hint={t('Birthday')}
          showCalendar={true}
          value={personalData.birthday}
          containerStyle={{ marginVertical: sizes.s / 2 }}
          inputStyle={{ height: sizes.inputHeight, fontSize: sizes.text }}
          onChangeText={text => handleChange({ birthday: text })}
          hasError={(!isValid.birthday || !isValid.legalAge) && personalData.birthday.length > 0}
          errorMessage={
            !isValid.legalAge
              ? t('You must be at least 18 years old')
              : t('Enter a valid birthday in yyyy/mm/dd format')
          }
        ></FormDateInput>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: sizes.m,
          }}
        >
          <LinkButton style={{ paddingRight: sizes.sm }} onPress={handleNavigateBack}>
            <AppText link>{t('I have an account')}</AppText>
          </LinkButton>
          <LinkButton
            disabled={Object.values(isValid).includes(false)}
            onPress={() => {
              setSignupData(personalData);
              router.navigate('/signup/step2/');
            }}
          >
            <AppText link>{t('Next')}</AppText>
          </LinkButton>
        </View>
      </View>
    </Screen>
  );
}
