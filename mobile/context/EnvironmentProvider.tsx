import { Platform } from 'react-native';

import { APP_ENV } from '@env';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';
import * as Application from 'expo-application';
import * as Device from 'expo-device';
import React, { createContext, useContext, useMemo, useState } from 'react';

import { AppEnvironment, DeviceInfo } from '@constants/types';
import { Logger } from '@utils/Logger';

const isDev = APP_ENV === 'development';

const EnvironmentContext = createContext<AppEnvironment | undefined>(undefined);

export const EnvironmentProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [device] = useState<DeviceInfo>({
    model: Device.modelName,
    os: `${Device.osName} ${Device.osVersion}`,
    appVersion: Application.nativeApplicationVersion,
    buildNumber: Application.nativeBuildVersion,
  });

  const env = useMemo<AppEnvironment>(
    () => ({
      isDev,
      platform: Platform.OS,
      logger: Logger,
      telemetry: Platform.OS === 'ios' ? Sentry : crashlytics,
      device: device,
    }),
    [device]
  );

  return <EnvironmentContext.Provider value={env}>{children}</EnvironmentContext.Provider>;
};

export const useAppEnv = (): AppEnvironment => {
  const context = useContext(EnvironmentContext);
  if (!context) throw new Error('useAppEnv must be used within EnvironmentProvider');
  return context;
};
