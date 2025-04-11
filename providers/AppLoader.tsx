import { useEffect } from "react";
import { StatusBar, Platform, Text } from "react-native";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useAuth } from "@/hooks/useAuth";
import { ThemeProvider, useData } from "@/hooks";

import { DebugProvider } from "@/utils/debug/DebugContext";
import { DebugOverlay } from "@/utils/debug/DebugOverlay";
import { View } from "@/components/View";

export function AppLoader() {
  const { theme, setTheme, isDark } = useData();
  const { initializing } = useAuth();

  const [fontsLoaded] = useFonts(
    theme?.assets
      ? {
          "OpenSans-Light": theme.assets.OpenSansLight,
          "OpenSans-Regular": theme.assets.OpenSansRegular,
          "OpenSans-SemiBold": theme.assets.OpenSansSemiBold,
          "OpenSans-ExtraBold": theme.assets.OpenSansExtraBold,
          "OpenSans-Bold": theme.assets.OpenSansBold,
        }
      : {}
  );

  useEffect(() => {
    if (Platform.OS === "android") StatusBar.setTranslucent(true);
    StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
  }, [isDark]);

  if (!fontsLoaded || !theme?.assets || initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading assets...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme} setTheme={setTheme}>
      <DebugProvider>
        <Slot />
        <DebugOverlay />
      </DebugProvider>
    </ThemeProvider>
  );
}
