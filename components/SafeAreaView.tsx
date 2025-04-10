import React from "react";
import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { useDebugStyle } from "@/utils/debug/useDebugStyle";

type Props = SafeAreaViewProps & { debug?: boolean };

export const SafeAreaView = ({ debug, style, ...props }: Props) => {
  const debugStyle = useDebugStyle(debug);
  return <RNSafeAreaView style={[debugStyle, style]} {...props} />;
};
