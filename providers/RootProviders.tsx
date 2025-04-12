import * as Sentry from "@sentry/react-native";
import { DataProvider } from "@/hooks";
import { AuthProvider } from "@/hooks";
import { TranslationProvider } from "@/hooks";
import { AppLoader } from "./AppLoader";
import { Text } from "react-native";
import { EnvironmentProvider } from "./EnvironmentProvider";

const SentryFallback = () => (
  <Text style={{ margin: 20 }}>
    Oops! Something went wrong. Please restart the app.
  </Text>
);

export function RootProviders() {
  return (
    <EnvironmentProvider>
      <Sentry.ErrorBoundary fallback={SentryFallback} showDialog>
        <DataProvider>
          <TranslationProvider>
            <AuthProvider>
              <AppLoader />
            </AuthProvider>
          </TranslationProvider>
        </DataProvider>
      </Sentry.ErrorBoundary>
    </EnvironmentProvider>
  );
}
