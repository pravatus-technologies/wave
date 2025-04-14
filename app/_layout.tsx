import "@/utils/Sentry"; // Initialize sentry

import "react-native-reanimated";
import { RootProviders } from "@/providers/RootProviders";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <RootProviders />
    </GestureHandlerRootView>
  );
}
