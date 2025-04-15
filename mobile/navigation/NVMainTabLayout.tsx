import { Alert, Text, SafeAreaView } from 'react-native';

import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { CTRLIcon, CTRLTabButton } from '@components/controls';
import { ITabButtonProps } from '@constants/types';
import { useAuth, useTheme } from '@context';

export default function NVMainTabLayout(): React.ReactNode {
  const { colors, sizes } = useTheme();
  const { user, initializing } = useAuth();

  if (initializing) return null;

  if (!user) return <Redirect href="/(auth)/signin/" />;

  const handleActionPress = (): void => {
    Alert.alert(`Wave action pressed!`);
  };

  const tabPages: ITabButtonProps[] = [
    {
      name: 'index',
      title: 'Home',
      icon: 'Home',
    },
    {
      name: '(friends)',
      title: 'Friends',
      icon: 'Users',
    },
    {
      name: 'action',
      title: 'Wave',
      icon: 'Hand',
      onCustomPress: handleActionPress,
    },
    {
      name: 'messages',
      title: 'Messages',
      icon: 'MessageCircleMore',
    },
    {
      name: 'notifications',
      title: 'Alerts',
      icon: 'Bell',
    },
  ];

  return !user ? (
    <SafeAreaView>
      <Text>User is null</Text>
    </SafeAreaView>
  ) : (
    <Tabs
      screenOptions={{
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarStyle: {
          position: 'absolute',
          borderTopRightRadius: 25, // 👈 round corners
          borderTopLeftRadius: 25,
          backgroundColor: 'white',
          height: 70,
          elevation: 25, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          height: 80,
        },
        tabBarActiveTintColor: colors.primary as string,
        tabBarInactiveTintColor: colors.text as string,
      }}
    >
      {tabPages.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerShown: false,
            tabBarButton: props => (
              <CTRLTabButton
                title={tab.title}
                onCustomPress={tab.onCustomPress ? tab.onCustomPress : props.onPress}
                {...props}
              >
                <CTRLIcon
                  name={tab.icon}
                  size={sizes.m}
                  color={props.accessibilityState?.selected ? colors.primary : colors.text}
                />
              </CTRLTabButton>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
