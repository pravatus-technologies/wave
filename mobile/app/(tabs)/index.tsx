import { Pressable, Text } from 'react-native';

import { AppText, Screen } from '@components/controls';
import { useAuth, useTranslation } from '@context';

export default function Home(): JSX.Element {
  const { logout } = useAuth();
  const { t } = useTranslation();
  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <AppText>{t('hello')}</AppText>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </Screen>
  );
}
