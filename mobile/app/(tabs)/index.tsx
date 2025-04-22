import { View, Text, Image, Button } from 'react-native';

import React from 'react';

import { useAuth } from '@context/AuthContext';

export default function HomePage() {
  const { logout, profile } = useAuth();

  if (!profile) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text>Welcome, {profile.email}</Text>
      {profile.pictureUri && (
        <Image
          source={{ uri: profile.pictureUri }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />
      )}
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
