import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
  Insets,
  View,
} from 'react-native';

import React from 'react';

import { useTheme } from '@context';

type TextLinkButtonProps = {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  hitSlop?: Insets;
  accessibilityLabel?: string;
};

export function LinkButton({
  children,
  onPress,
  style,
  containerStyle,
  disabled = false,
  hitSlop = { top: 4, bottom: 4, left: 4, right: 4 },
  accessibilityLabel,
}: TextLinkButtonProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <View style={[containerStyle]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={containerStyle}
      >
        <Text style={[{ color: colors.primary }, style, disabled && styles.disabled]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: '#1B95E0',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});
