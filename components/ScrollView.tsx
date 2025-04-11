import React from "react";
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  ViewStyle,
} from "react-native";
import { useDebugStyle } from "@/utils/debug/useDebugStyle";

type Props = ScrollViewProps & { debug?: boolean };

export const ScrollView = ({ debug, style, ...props }: Props) => {
  const debugStyle = useDebugStyle(debug);
  return <RNScrollView style={[debugStyle, style]} {...props} />;
};
