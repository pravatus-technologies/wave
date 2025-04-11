import { useTheme } from "@/hooks";
import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  spinnerColor?: string;
};

export const ActionButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  spinnerColor = "#ffffff",
}: Props) => {
  const isDisabled = disabled || loading;
  const { colors, sizes } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        {
          backgroundColor: isDisabled ? colors.gray : colors.primary,
          paddingVertical: 12,
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
      <Text style={[{ color: "#fff", fontWeight: "bold" }, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};
