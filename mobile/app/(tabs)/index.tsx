import { View, Text, Image, Button } from 'react-native';

import React from 'react';

import { useAuth } from '@context/AuthContext';

export default function HomePage() {
  const { user, logout } = useAuth();

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text>Welcome, {user.email}</Text>
      {user.photoURL && (
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />
      )}
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
