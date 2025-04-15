import { useEffect } from "react";
import { StatusBar, Platform, Text, View } from "react-native";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { ThemeProvider, useAuth, useData } from "@context";

export function AppProvider() {
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
      <Slot />
    </ThemeProvider>
  );
}
