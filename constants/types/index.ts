import * as LucideIcons from "lucide-react-native";
import { GestureResponderEvent } from "react-native";

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