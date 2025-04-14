import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import * as LucideIcons from "lucide-react-native";
import { ColorValue, GestureResponderEvent, StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";

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

/***
 * We define an extension of the default BottomTabBarButtonProps
 * for our PVTabBarButton since we want to have the option of passing
 * in a custom behavior instead of the default provided by react which
 * triggers a navigation to a set Screen.
 */
export interface PVTabBarButtonProps extends BottomTabBarButtonProps {
  title?: string;
  onCustomPress?: (event: GestureResponderEvent) => void;
};

/***
 * An interface for PVImageButton so we can define the shape
 * of the parameter being passed to the PVImageButton
 */
export interface PVImageButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

