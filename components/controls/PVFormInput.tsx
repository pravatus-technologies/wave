import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
  Text,
} from "react-native";
import * as LucideIcons from "lucide-react-native";
import { useTheme } from "@/hooks";
import { PVFormInputProps } from "@/constants/types";

export default function PVFormInput({
  containerStyle,
  inputStyle,
  icon,
  iconSize = 20,
  iconColor = "#949494",
  secureTextEntry,
  ...props
}: PVFormInputProps): JSX.Element {
  const LucideIcon = icon
    ? (LucideIcons[icon] as React.ComponentType<{
        size?: number;
        color?: string;
        style?: any;
      }>)
    : null;

  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = !!secureTextEntry;
  const togglePassword = () => setIsPasswordVisible((prev) => !prev);

  const ToggleIcon = (
    isPasswordVisible ? LucideIcons.EyeOff : LucideIcons.Eye
  ) as React.ComponentType<{
    size?: number;
    color?: string;
    style?: any;
  }>;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        {LucideIcon && (
          <LucideIcon size={iconSize} color={iconColor} style={styles.icon} />
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor="#949494"
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <Pressable onPress={togglePassword}>
            <Text style={[styles.toggleText, { color: colors.text }]}>
              <ToggleIcon size={20} color={iconColor} style={styles.icon} />
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginTop: -4,
    marginRight: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  toggleText: {
    fontWeight: "500",
    paddingLeft: 8,
  },
});
