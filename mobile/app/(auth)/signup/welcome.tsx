import { View, Image } from 'react-native';

import { useRouter } from 'expo-router';

import { AppText, FormButton, ImageButton, LinkButton, Screen } from '@components/controls';
import { useTheme, useTranslation } from '@context';
import { useSignup } from '@context/SignupContext';
import { AppIcon } from 'src/components';

export default function SignupWelcome(): JSX.Element {
  const { data } = useSignup();
  const { t } = useTranslation();
  const { colors, sizes } = useTheme();

  const router = useRouter();

  return (
    <Screen>
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
        <AppText h1>{`Hi, ${data.givenNames}!`}</AppText>
        <Image
          source={{ uri: data.pictureUri as string }}
          width={48}
          height={48}
          borderRadius={24}
        />
      </View>
      <View>
        <AppText
          p
          style={{
            paddingHorizontal: sizes.padding,
            marginTop: sizes.sm,
          }}
        >
          {t(
            "We're so glad to have you, invite your friends and family so you can share this new and exciting experience!"
          )}
        </AppText>
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
          <LinkButton
            disabled={false}
            onPress={() => {
              console.log(`Data: ${JSON.stringify(data)}`);
              router.navigate('/');
            }}
          >
            <AppText link>{t("I'll do this later")}</AppText>
          </LinkButton>
        </View>
      </View>
    </Screen>
  );
}
