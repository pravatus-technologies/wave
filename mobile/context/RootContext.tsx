import { Text } from 'react-native';

import * as Sentry from '@sentry/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppProvider } from './AppContext';
import { AuthProvider } from './AuthContext';
import { BootstrapProvider } from './BootstrapContext';
import { EnvironmentProvider } from './EnvironmentContext';
import { TranslationProvider } from './TranslationContext';

const SentryFallback = (): JSX.Element => (
  <SafeAreaView
    style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}
  >
    <Text style={{ fontSize: 24, color: 'white' }}>
      Oops! Something went wrong. Please restart the app
    </Text>
  </SafeAreaView>
);

export function RootProvider(): JSX.Element {
  return (
    <BootstrapProvider>
      <AuthProvider>
        <EnvironmentProvider>
          <Sentry.ErrorBoundary fallback={SentryFallback} showDialog>
            <TranslationProvider>
              <AppProvider />
            </TranslationProvider>
          </Sentry.ErrorBoundary>
        </EnvironmentProvider>
      </AuthProvider>
    </BootstrapProvider>
  );
}
