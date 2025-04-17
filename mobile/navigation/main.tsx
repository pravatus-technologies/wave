import { Text } from 'react-native';

import { Redirect, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@context';

export default function MainLayout(): React.ReactNode {
  const { user } = useAuth();

  if (!user) return <Redirect href="/(auth)/signin/" />;

  return !user ? (
    <SafeAreaView>
      <Text>No User</Text>
    </SafeAreaView>
  ) : (
    <Tabs />
  );
}
