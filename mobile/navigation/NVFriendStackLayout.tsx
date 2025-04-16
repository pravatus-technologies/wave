import { Stack } from 'expo-router';

import { SCRFriendsHomeHeader } from '@components/screens/SCRFriendsHome';

export default function NVFriendStackLayout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <SCRFriendsHomeHeader />,
        }}
      />
    </Stack>
  );
}
