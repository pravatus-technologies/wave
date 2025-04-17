import { ButtonProps, ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type FormButtonProps = ButtonProps & {
  title: string;
  onPress: () => void;
  outline?: boolean;
  loading?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textColor?: ColorValue;
  textStyle?: StyleProp<TextStyle>;
  spinnerColor?: ColorValue;
};
