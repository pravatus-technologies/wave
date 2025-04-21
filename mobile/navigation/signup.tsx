import { Stack } from 'expo-router';

import { SignupProvider } from '@context/SignupContext';

export default function SignupLayout(): JSX.Element {
  return (
    <SignupProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </SignupProvider>
  );
}
