import { View, Image, StatusBar, Alert } from 'react-native';

import { useRouter } from 'expo-router';

import { AppText, FormButton, ImageButton, LinkButton, Screen } from '@components/controls';
import { ISignupData } from '@constants/types/interfaces';
import { useAuth, useTheme, useTranslation } from '@context';
import { useSignup } from '@context/SignupContext';
import { AppIcon } from 'src/components';
import { useState } from 'react';

export default function ConfirmSignup(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { registerUserWithEmail } = useAuth();
  const { data } = useSignup();
  const { t } = useTranslation();
  const router = useRouter();

  const [busy, setBusy] = useState(false);

  const handleOnConfirm = async (data: ISignupData): Promise<void> => {
    setBusy(true);
    try {
      await registerUserWithEmail({ ...data });
      router.navigate('/signup/welcome/');
    } catch (error) {
      const err = error as Error;
      Alert.alert(`Error on user create: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.black} />
      <Screen>
        {/* header back button container */}
        <View
          style={{
            alignItems: 'flex-start',
            marginHorizontal: -3,
          }}
        >
          <ImageButton onPress={() => router.back()}>
            <AppIcon name="ChevronLeft" size={sizes.m} color={colors.text} />
          </ImageButton>
        </View>
        {/* header title container */}
        <View style={{ padding: sizes.padding }}>
          <AppText h1>{t("That's a beautiful smile!")}</AppText>
          <AppText h5 style={{ marginTop: sizes.sm }}>
            {t("If you're not satisfied you can always pick another one")}
          </AppText>
        </View>
        {/* Preview circle */}
        <View style={{ padding: sizes.padding, alignItems: 'center', marginTop: sizes.m }}>
          <Image
            source={{ uri: data.pictureUri as string }}
            style={{
              height: 250,
              width: 250,
              borderRadius: 125,
              borderWidth: 5,
              borderColor: colors.primary,
            }}
          />
        </View>
        {/* form buttons */}
        <View style={{ padding: sizes.padding, marginTop: sizes.m }}>
          <FormButton
            loading={busy}
            title={t('This looks good!')}
            onPress={() => handleOnConfirm(data)}
          ></FormButton>
          <FormButton
            containerStyle={{ marginTop: sizes.s }}
            outline={true}
            title={t('Let me give it another shot')}
            onPress={() => router.back()}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: sizes.l,
            }}
          >
            <LinkButton disabled={false} onPress={() => console.log('Skip to onboarding')}>
              <AppText link>{t("I'll do this later")}</AppText>
            </LinkButton>
          </View>
        </View>
      </Screen>
    </>
  );
}
