import { Platform, StatusBar } from 'react-native';

import { Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { useAuth } from './AuthContext';
import { useBootstrap } from './BootstrapContext';
import { ThemeProvider } from './ThemeContext';

export function AppProvider(): JSX.Element {
  const { theme, setTheme, isDark } = useBootstrap();

  useEffect(() => {
    if (Platform.OS === 'android') StatusBar.setTranslucent(true);
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
  }, [isDark]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <Slot />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
