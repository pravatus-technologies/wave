import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/hooks/useAuth";
import { logInfo } from "@/utils/Logger";
import { DebugProvider } from "@/utils/debug/DebugContext";
import { DebugOverlay } from "@/utils/debug/DebugOverlay";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  logInfo("RootLayout", "-- Was here");

  return (
    <DebugProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
      <DebugOverlay />
    </DebugProvider>
  );
}
