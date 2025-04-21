import { View } from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, FormButton, ImageButton, LinkButton } from '@components/controls';
import { useTheme, useTranslation } from '@context';
import { AppIcon } from 'src/components';

export default function SignupStep3(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* header back button container */}
      <View
        style={{
          alignItems: 'flex-start',
          marginHorizontal: -3,
        }}
      >
        {/* This is hidden */}
        <ImageButton onPress={() => console.log()}>
          <AppIcon name="ChevronLeft" size={sizes.m} color={colors.background} />
        </ImageButton>
      </View>
      {/* header title container */}
      <View style={{ padding: sizes.padding }}>
        <AppText h1>{t('Time for a selfie!')}</AppText>
        <AppText h5 style={{ marginTop: sizes.sm }}>
          {t("Let's show the world your smile")}
        </AppText>
      </View>
      {/* form buttons */}
      <View style={{ padding: sizes.padding, marginTop: sizes.m }}>
        <FormButton
          title={t('Take a picture')}
          onPress={() => router.navigate('/signup/selfie')}
        ></FormButton>
        <FormButton
          containerStyle={{ marginTop: sizes.s }}
          outline={true}
          title={t('Upload an existing picture')}
          onPress={() => console.log('Upload picture')}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: sizes.m,
          }}
        >
          <LinkButton disabled={false} onPress={() => console.log('Skip to onboarding')}>
            <AppText link>{t("I'll do this later")}</AppText>
          </LinkButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
