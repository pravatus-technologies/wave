import { Pressable, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '@components/controls/AppText';
import { useAuth, useTranslation } from '@context';

export default function Home(): JSX.Element {
  const { logout } = useAuth();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText>{t('hello')}</AppText>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
