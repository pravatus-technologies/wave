import React from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";
import * as LucideIcons from "lucide-react-native";
import { logWarn } from "@/utils/Logger";
import { useData, useTheme } from "@/hooks";

type IconName = keyof typeof LucideIcons;

type Props = {
  name: IconName;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export const Icon: React.FC<Props> = ({
  name,
  size = 24,
  color = "#000",
  style,
}) => {
  const { colors, sizes } = useTheme();
  const { isDark } = useData();

  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    color?: ColorValue;
    size?: number;
    style?: StyleProp<ViewStyle>;
  }>;

  if (!LucideIcon) {
    logWarn(
      new Error("Unknown Icon"),
      "Icon",
      `Icon "${name}" not found in lucide-react-native.`
    );
    return null;
  }

  return <LucideIcon color={color ?? colors.text} size={size} style={style} />;
};
