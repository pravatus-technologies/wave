import React from "react";
import { View as RNView, ViewProps } from "react-native";
import { useDebugStyle } from "@/utils/debug/useDebugStyle";

type Props = ViewProps & { debug?: boolean };

export const View = ({ debug, style, ...props }: Props) => {
  const debugStyle = useDebugStyle(debug);
  return <RNView style={[debugStyle, style]} {...props} />;
};
