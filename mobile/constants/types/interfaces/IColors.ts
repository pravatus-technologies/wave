/**
 * Theme Colors interface
 */
import { ColorValue } from 'react-native';

export interface IColors {
  text: ColorValue;
  hint: ColorValue;
  primary: ColorValue;
  secondary: ColorValue;

  tertiary: ColorValue;
  black: ColorValue;
  white: ColorValue;
  light: ColorValue;
  dark: ColorValue;
  gray: ColorValue;
  danger: ColorValue;
  warning: ColorValue;
  success: ColorValue;
  info: ColorValue;
  card: ColorValue;
  background: ColorValue;
  border: ColorValue;
  shadow: ColorValue;
  overlay: ColorValue;
  focus: ColorValue;
  input: ColorValue;
  switchOn: ColorValue;
  switchOff: ColorValue;
  checkbox: string[];
  checkboxIcon: ColorValue;
  facebook: ColorValue;
  twitter: ColorValue;
  dribbble: ColorValue;
  icon: ColorValue;
  blurTint: 'light' | 'dark' | 'default';
  link: ColorValue;
}
