import { View, Text, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { FormButton, ImageButton, LinkButton } from '@components/controls';
import { useTheme, useTranslation } from '@context';
import { useSignup } from '@context/SignupContext';
import { AppIcon } from 'src/components';

export default function SignupWelcome(): JSX.Element {
  const { data } = useSignup();
  const { t } = useTranslation();
  const { colors, sizes } = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: sizes.padding }}
    >
      {/* header back button container */}
      <View
        style={{
          alignItems: 'flex-start',
          marginHorizontal: -3,
        }}
      >
        <ImageButton onPress={() => console.log('back')}>
          <AppIcon name="ChevronLeft" size={sizes.m} color={colors.background} />
        </ImageButton>
      </View>
      {/* header title container */}
      <View
        style={{
          padding: sizes.padding,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontFamily: 'OpenSans-Regular', fontSize: sizes.h1 }}>
          {`Hi, ${data.givenNames}!`}
        </Text>
        <Image
          source={{ uri: data.pictureUri as string }}
          width={48}
          height={48}
          borderRadius={24}
        />
      </View>
      <View>
        <Text
          style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: sizes.p,
            paddingHorizontal: sizes.padding,
            marginTop: sizes.sm,
          }}
        >
          {t(
            "We're so glad to have you, invite your friends and family so you can share this new and exciting experience!"
          )}
        </Text>
      </View>
      {/* form buttons */}
      <View style={{ padding: sizes.padding, marginTop: sizes.m }}>
        <FormButton title={t('Invite my friends')} onPress={() => console.log('hello')} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: sizes.m,
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
