import { useTheme } from "@/hooks";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
} from "react-native";

type Props = {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  switchColor?: {
    true: ColorValue;
    false: ColorValue;
    thumb?: ColorValue;
  };
};

export const FormToggle = ({
  label,
  value,
  onValueChange,
  containerStyle,
  labelStyle,
  switchColor = {
    true: "#34C759", // iOS green
    false: "#ccc",
    thumb: "#ffffff",
  },
}: Props) => {
  const { colors } = useTheme();
  switchColor = {
    true: colors.primary,
    false: colors.switchOff,
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: switchColor.false,
          true: switchColor.true,
        }}
        thumbColor={switchColor.thumb}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});
