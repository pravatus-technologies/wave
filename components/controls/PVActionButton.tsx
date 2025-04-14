import { useData, useTheme } from "@/hooks";
import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textColor?: ColorValue;
  textStyle?: StyleProp<TextStyle>;
  spinnerColor?: ColorValue;
};

export const PVActionButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  textColor,
  spinnerColor = "#ffffff",
}: Props) => {
  const { isDark } = useData();
  const { colors, sizes } = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        {
          backgroundColor: isDisabled ? colors.gray : colors.primary,
          paddingVertical: 8,
          paddingHorizontal: 24,

          borderWidth: 1,
          borderColor: loading ? colors.gray : colors.primary,
          borderRadius: 25,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          opacity: isDisabled ? 0.7 : 1,
        },
        buttonStyle,
      ]}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={spinnerColor}
          style={{ marginRight: 8 }}
        />
      )}
      <Text
        style={[
          { color: textColor ?? colors.white, fontWeight: "bold" },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};
