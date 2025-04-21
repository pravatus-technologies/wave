import { View, Text, Image } from 'react-native';

import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormButton, ImageButton, LinkButton } from '@components/controls';
import { useTheme, useTranslation } from '@context';
import { useSignup } from '@context/SignupContext';
import { AppIcon } from 'src/components';

export default function ConfirmSignup(): JSX.Element {
  const { colors, sizes } = useTheme();
  const { data } = useSignup();
  const { t } = useTranslation();
  const router = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* header back button container */}
      <View
        style={{
          alignItems: 'flex-start',
          marginHorizontal: -3,
        }}
      >
        <ImageButton onPress={() => router.goBack()}>
          <AppIcon name="ChevronLeft" size={sizes.m} color={colors.text} />
        </ImageButton>
      </View>
      {/* header title container */}
      <View style={{ padding: sizes.padding }}>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: sizes.h1 }}>
          {t("That's a beautiful smile!")}
        </Text>
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: sizes.h5, marginTop: sizes.sm }}>
          {t("If you're not satisfied you can always pick another one")}
        </Text>
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
          title={t('This looks good!')}
          onPress={() => console.log('Save details and proceed to onboarding')}
        ></FormButton>
        <FormButton
          containerStyle={{ marginTop: sizes.s }}
          outline={true}
          title={t('Let me give it another shot')}
          onPress={() => router.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: sizes.l,
          }}
        >
          <LinkButton disabled={false} onPress={() => console.log('Skip to onboarding')}>
            <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>{t("I'll do this later")}</Text>
          </LinkButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
