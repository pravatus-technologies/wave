import { Stack } from 'expo-router';

import { SignupProvider } from '@context/SignupContext';

export default function SignupLayout(): JSX.Element {
  return (
    <SignupProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="selfie" />
        <Stack.Screen name="confirm" />
      </Stack>
    </SignupProvider>
  );
}
