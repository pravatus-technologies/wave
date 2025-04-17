import { Pressable, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@context';

export default function Home(): JSX.Element {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello World</Text>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
