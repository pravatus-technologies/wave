import { SignupProvider } from '@context/SignupContext';
import { Stack } from 'expo-router';

export default function SignupLayout(): JSX.Element {
  return (
    <SignupProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="step2" />
        <Stack.Screen name="step3" />
        <Stack.Screen name="selfie" />
      </Stack>
    </SignupProvider>
  );
}
