import React from "react";
import {
  KeyboardAvoidingView as RNKAV,
  KeyboardAvoidingViewProps,
  Platform,
} from "react-native";
import { useDebugStyle } from "@/utils/debug/useDebugStyle";

type Props = KeyboardAvoidingViewProps & { debug?: boolean };

export const KeyboardAvoidingView = ({
  debug,
  style,
  behavior = Platform.OS === "ios" ? "padding" : undefined,
  ...props
}: Props) => {
  const debugStyle = useDebugStyle(debug);
  return <RNKAV behavior={behavior} style={[debugStyle, style]} {...props} />;
};
