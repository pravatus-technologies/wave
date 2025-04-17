import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

/***
 * An interface for PVImageButton so we can define the shape
 * of the parameter being passed to the PVImageButton
 */
export interface ImageButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
