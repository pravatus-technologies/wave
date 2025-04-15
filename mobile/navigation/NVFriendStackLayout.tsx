import { Stack } from 'expo-router';

export default function NVFriendStackLayout(): JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
