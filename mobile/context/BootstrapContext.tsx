import { SENTRY_DSN, APP_ENV } from '@env';
import Storage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { BootstrapContextType } from '@constants/types';
import { ITheme } from '@constants/types/interfaces';
import { Logger } from '@utils/Logger';

import { BASE as base } from '../themes/base';
import { DARK as dark } from '../themes/dark';
import { LIGHT as light } from '../themes/light';

const BootstrapContext = createContext<BootstrapContextType | undefined>(undefined);

export function BootstrapProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const [bootComplete, setBootComplete] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);

  /***
   * Load fonts from base theme
   */
  const [fontsLoaded] = useFonts({
    'OpenSans-Light': base.fonts.LightFont,
    'OpenSans-Regular': base.fonts.RegularFont,
    'OpenSans-SemiBold': base.fonts.SemiBoldFont,
    'OpenSans-ExtraBold': base.fonts.ExtraBoldFont,
    'OpenSans-Bold': base.fonts.BoldFont,
  });

  const isReady = bootComplete && fontsLoaded;

  // get isDark mode from storage
  const getIsDark = useCallback(async () => {
    // get preferance gtom storage
    const isDarkJSON = await Storage.getItem('isDark');

    if (isDarkJSON !== null) {
      // set isDark / compare if has updated
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  // handle isDark mode
  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      // save preferance to storage
      Storage.setItem('isDark', JSON.stringify(payload));
    },
    [setIsDark]
  );

  /***
   * Use this hook to run initialization tasks
   */
  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        await SplashScreen.preventAutoHideAsync();
        Sentry.init({
          dsn: SENTRY_DSN,
          // Adds more context data to events (IP address, cookies, user, etc.)
          // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
          sendDefaultPii: true,
          // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
          // We recommend adjusting this value in production.
          tracesSampleRate: 1.0,
          // profilesSampleRate is relative to tracesSampleRate.
          // Here, we'll capture profiles for 100% of transactions.
          profilesSampleRate: 1.0,
          debug: __DEV__,
        });

        // Load env and flags (stubbed)
        await new Promise(res => setTimeout(res, 5000));

        setBootComplete(true);

        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        Logger.error(error, 'Bootstrap', 'An error occured while bootstrapping the application');
      }
    };

    init();
  }, [fontsLoaded]);

  // get initial data for: isDark & language
  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);

  if (!isReady) return null;

  const contextValue = {
    env: APP_ENV,
    isReady,
    theme,
    isDark,
    setTheme,
    handleIsDark,
  };
  return <BootstrapContext.Provider value={contextValue}>{children}</BootstrapContext.Provider>;
}

export const useBootstrap = (): BootstrapContextType => {
  const context = useContext(BootstrapContext);
  if (!context) throw new Error('useBootstrap must be used within BootstrapProvider');
  return context;
};
