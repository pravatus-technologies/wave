import { StyleProp, ViewStyle, TextInputProps, TextStyle } from "react-native";


export type FormDateInputProps = TextInputProps & {
  value?: string;
  onChangeText?: (val: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  hint?: string;
  showCalendar: boolean;
  inputStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  errorText?: string;
};
