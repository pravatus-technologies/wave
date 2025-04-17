import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@utils/Logger';

import { DeviceInfo } from './DeviceInfo';
export type AppEnvironment = {
  isDev: boolean;
  platform: 'ios' | 'android' | 'windows' | 'macos' | 'web';
  logger: typeof Logger;
  telemetry: typeof Sentry | typeof crashlytics;
  device: DeviceInfo;
};
