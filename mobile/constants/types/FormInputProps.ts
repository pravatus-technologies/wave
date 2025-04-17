import { ColorValue, TextInputProps, TextStyle, ViewStyle } from 'react-native';

import { IconName } from './IconName';

export type FormInputProps = TextInputProps & {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  icon?: IconName;
  iconSize?: number;
  iconColor: ColorValue;
};
