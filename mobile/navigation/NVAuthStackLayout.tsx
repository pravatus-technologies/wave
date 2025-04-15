import { Stack } from 'expo-router';

export default function NVAuthStackLayout(): JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // if you want no headers
      }}
    />
  );
}
