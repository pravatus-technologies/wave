import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import crashlytics from '@react-native-firebase/crashlytics';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import * as Sentry from '@sentry/react-native';
import * as LucideIcons from 'lucide-react-native';
import { SharedValue } from 'react-native-reanimated';

import { Logger } from '@utils/Logger';

export * from './IUseData';
export * from './ITranslate';
export * from './ITheme';
export * from './IThemeProvider';
export * from './IconName';
export * from './AuthContext';

export * from './IFriend';
export * from './IFriendRequest';
export * from './ILogger';
export * from './errors';

export type IconName = keyof typeof LucideIcons;

export interface ITabButtonProps {
  name: string;
  title: string;
  icon: IconName;
  onCustomPress?: (event: GestureResponderEvent) => void;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginValidation {
  email: boolean;
  password: boolean;
}

export type FirebaseAuthError = {
  code: string;
  message: string;
  name: string;
};

export type PostOrPlaceholder = Post | { id: string; placeholder: boolean };

/***
 * Shape of Notification data
 */
export type NotificationItem = {
  id: number;
  name: string;
  action: string;
  time: string;
  avatar: string;
  icon: string;
  unread?: boolean;
  buttons?: boolean;
};

/***
 * PVIconProps
 */
export type PVIconProps = {
  name: IconName;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export type PVFormInputProps = TextInputProps & {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  icon?: IconName;
  iconSize?: number;
  iconColor?: string;
};

export type PVActionButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textColor?: ColorValue;
  textStyle?: StyleProp<TextStyle>;
  spinnerColor?: ColorValue;
};

export type DeviceInfo = {
  model: string | null;
  os: string;
  appVersion: string | null;
  buildNumber: string | null;
};

export type AppEnvironment = {
  isDev: boolean;
  platform: 'ios' | 'android' | 'windows' | 'macos' | 'web';
  logger: typeof Logger;
  telemetry: typeof Sentry | typeof crashlytics;
  device: DeviceInfo;
};

export type MainTabParamList = {
  index: undefined;
  friends: undefined;
  action: undefined;
  messages: undefined;
  alerts: undefined;
};

export interface Comment {
  name: string;
  avatar: string;
  text: string;
  time: string;
}

export interface Post {
  id: string;
  author: string;
  avatar?: string;
  text?: string;
  media?: string[];
  link?: string;
  commentsList?: Comment[];
  time?: string;
  comments?: string;
  shares?: string;
  reactedBy?: string;
  reactions?: string;
}

export interface Friend {
  id: string;
  avatar: string;
  friendName: string;
  shortBio: string;
  mutualFriends: number;
}

export interface PostCardProps {
  post: Post;
  scrollY: SharedValue<number>;
  index?: number;
  isVisible?: boolean;
}

export interface HomeScreenFeedRef {
  scrollToTop: () => void;
  refresh: () => void;
}

export interface HomeScreenFeedProps {
  scrollY: SharedValue<number>;
}

/***
 * We define an extension of the default BottomTabBarButtonProps
 * for our PVTabBarButton since we want to have the option of passing
 * in a custom behavior instead of the default provided by react which
 * triggers a navigation to a set Screen.
 */
export interface TabBarButtonProps extends BottomTabBarButtonProps {
  title?: string;
  onCustomPress?: (event: GestureResponderEvent) => void;
}

/***
 * An interface for PVImageButton so we can define the shape
 * of the parameter being passed to the PVImageButton
 */
export interface ImageButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
