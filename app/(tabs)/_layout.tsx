import { Redirect, Tabs } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";

import { useAuth } from "@/hooks/useAuth";

import { useTheme } from "@/hooks";
import { PVIcon } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PVTabBarButton from "@/components/controls/PVTabBarButton";
import { ITabButtonProps } from "@/constants/types";

export const CustomHeader = ({ title, logo }: { title: string; logo: any }) => {
  const insets = useSafeAreaInsets();
  const { colors, assets, sizes } = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.inner}>
        <Image
          source={assets.logoText}
          style={{
            width: 128,
            height: 24,
            resizeMode: "contain",
            marginLeft: -18,
          }}
        />
        <View style={{ flex: 1 }} />
        <PVIcon name="User2Icon" size={24} color={colors.text} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e5e5",
  },
  inner: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  rightIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default function TabLayout() {
  const { colors, assets, sizes } = useTheme();
  const { user, initializing } = useAuth();

  if (initializing) return null;

  if (!user) return <Redirect href="/(auth)/signin/" />;

  const handleActionPress = () => {
    Alert.alert(`Wave action pressed!`);
  };

  const tabPages: ITabButtonProps[] = [
    {
      name: "index",
      title: "Home",
      icon: "Home",
    },
    {
      name: "(friends)",
      title: "Friends",
      icon: "Users",
    },
    {
      name: "action",
      title: "Wave",
      icon: "Hand",
      onCustomPress: handleActionPress,
    },
    {
      name: "messages",
      title: "Messages",
      icon: "MessageCircleMore",
    },
    {
      name: "notifications",
      title: "Alerts",
      icon: "Bell",
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
          position: "absolute",
          borderTopRightRadius: 25, // 👈 round corners
          borderTopLeftRadius: 25,
          backgroundColor: "white",
          height: 70,
          elevation: 25, // Android shadow
          shadowColor: "#000", // iOS shadow
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarItemStyle: {
          height: 80,
        },
        tabBarActiveTintColor: colors.primary as string,
        tabBarInactiveTintColor: colors.text as string,
      }}
    >
      {tabPages.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerShown: false,
            tabBarButton: (props) => (
              <PVTabBarButton
                title={tab.title}
                onCustomPress={
                  tab.onCustomPress ? tab.onCustomPress : props.onPress
                }
                {...props}
              >
                <PVIcon
                  name={tab.icon}
                  size={sizes.m}
                  color={
                    props.accessibilityState?.selected
                      ? colors.primary
                      : colors.text
                  }
                />
              </PVTabBarButton>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
