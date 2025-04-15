import { Text } from 'react-native';

import * as Sentry from '@sentry/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider, DataProvider } from '@context';
import { TranslationProvider } from '@context/TranslationProvider';

import { AppProvider } from './AppProvider';
import { EnvironmentProvider } from './EnvironmentProvider';

const SentryFallback = (): JSX.Element => (
  <Text style={{ margin: 20 }}>Oops! Something went wrong. Please restart the app.</Text>
);

export function RootProvider(): JSX.Element {
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
