import { Redirect, Tabs } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/useAuth";
import { logInfo } from "@/utils/Logger";
import { SafeAreaView } from "@/components/SafeAreaView";
import { useTheme } from "@/hooks";
import { Icon, View } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CustomHeader = ({ title, logo }: { title: string; logo: any }) => {
  const insets = useSafeAreaInsets();
  const { colors, assets } = useTheme();

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
        <Icon name="User2Icon" size={24} color={colors.text} />
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
  const { colors, assets } = useTheme();
  const { user, initializing } = useAuth();

  if (initializing) return null;

  if (!user) return <Redirect href="/(auth)/signin/" />;

  const handleActionPress = () => {
    Alert.alert(`Wave action pressed!`);
  };

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
          elevation: 5, // Android shadow
          shadowColor: "#000", // iOS shadow
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarActiveTintColor: colors.primary as string,
        tabBarInactiveTintColor: colors.text as string,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="House" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <Icon name="Users" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          title: "Wave",
          tabBarIcon: ({ color }) => (
            <Icon name="Hand" size={24} color={color} />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={(e) => {
                e.preventDefault();
                handleActionPress();
              }}
              style={({ pressed }) => ({
                marginTop: Platform.OS === "ios" ? 12 : 5,
                opacity: pressed ? 0.7 : 1,
                alignItems: "center",
                justifyContent: "center",
              })}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <Icon name="MessageCircleMore" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          title: "Alerts",
          tabBarIcon: ({ color }) => (
            <Icon name="Bell" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
