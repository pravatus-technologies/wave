import * as Sentry from "@sentry/react-native";

import { TranslationProvider } from "@context/TranslationProvider";

import { Text } from "react-native";
import { EnvironmentProvider } from "./EnvironmentProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, DataProvider } from "@context";
import { AppProvider } from "./AppProvider";

const SentryFallback = () => (
  <Text style={{ margin: 20 }}>
    Oops! Something went wrong. Please restart the app.
  </Text>
);

export function RootProvider() {
  return (
    <EnvironmentProvider>
      <Sentry.ErrorBoundary fallback={SentryFallback} showDialog>
        <DataProvider>
          <TranslationProvider>
            <AuthProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <AppProvider />
              </GestureHandlerRootView>
            </AuthProvider>
          </TranslationProvider>
        </DataProvider>
      </Sentry.ErrorBoundary>
    </EnvironmentProvider>
  );
}
