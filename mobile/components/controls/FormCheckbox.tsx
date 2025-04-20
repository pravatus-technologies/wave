import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Check } from 'lucide-react-native'; // or your custom AppIcon
import { useTheme } from '@context';

interface Props {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  hasError?: boolean;
  errorMessage?: string;
}

export default function FormCheckbox({
  label,
  value,
  onValueChange,
  hasError,
  errorMessage,
}: Props): JSX.Element {
  const { colors, sizes } = useTheme();

  return (
    <View style={{ marginVertical: sizes.s }}>
      <Pressable
        onPress={() => onValueChange(!value)}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          opacity: pressed ? 0.7 : 1,
        })}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View
          style={{
            width: 22,
            height: 22,
            borderWidth: 1.5,
            borderColor: hasError ? colors.danger : colors.border,
            backgroundColor: value ? colors.primary : colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
          }}
        >
          {value && <Check size={14} color="#fff" />}
        </View>
        <Text
          style={{
            marginLeft: sizes.base,
            color: colors.text,
            fontSize: sizes.text,
            fontFamily: 'OpenSans-Regular',
          }}
        >
          {label}
        </Text>
      </Pressable>

      {hasError && errorMessage && (
        <Text
          style={{
            color: colors.danger,
            fontSize: 12,
            marginTop: 4,
            marginLeft: 28, // to align error under label
          }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
