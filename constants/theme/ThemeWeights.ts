import { TextStyle } from "react-native";

/**
 * Theme Weights interface
 */
export interface ThemeWeights {
  text: TextStyle['fontWeight'];
  h1?: TextStyle['fontWeight'];
  h2?: TextStyle['fontWeight'];
  h3?: TextStyle['fontWeight'];
  h4?: TextStyle['fontWeight'];
  h5?: TextStyle['fontWeight'];
  p?: TextStyle['fontWeight'];

  thin: TextStyle['fontWeight'];
  extralight: TextStyle['fontWeight'];
  light: TextStyle['fontWeight'];
  normal: TextStyle['fontWeight'];
  medium: TextStyle['fontWeight'];
  semibold?: TextStyle['fontWeight'];
  bold?: TextStyle['fontWeight'];
  extrabold?: TextStyle['fontWeight'];
  black?: TextStyle['fontWeight'];
}