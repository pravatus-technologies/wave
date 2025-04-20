import { Pressable, StyleProp, TextInput, View, Text, ViewStyle } from 'react-native';

import * as LucideIcons from 'lucide-react-native';
import { useState } from 'react';

import { FormInputProps } from '@constants/types/FormInputProps';
import { useTheme } from '@context';

export default function FormInput({
  containerStyle,
  inputStyle,
  icon,
  iconSize = 24,
  iconColor = '#5B5B5C',
  secureTextEntry,
  hint,
  hasError = false,
  errorMessage,
  ...props
}: FormInputProps): JSX.Element {
  const LucideIcon = icon
    ? (LucideIcons[icon] as React.ComponentType<{
        size?: number;
        color?: string;
        style?: StyleProp<ViewStyle>;
      }>)
    : null;

  const { colors, sizes } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = !!secureTextEntry;
  const togglePassword = (): void => setIsPasswordVisible(prev => !prev);

  const ToggleIcon = (
    isPasswordVisible ? LucideIcons.EyeOff : LucideIcons.Eye
  ) as React.ComponentType<{
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
  }>;

  return (
    <View style={[containerStyle]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}
      >
        {LucideIcon && (
          <LucideIcon
            size={iconSize}
            color={iconColor as string}
            style={{
              marginTop: -4,
              marginRight: 2,
            }}
          />
        )}
        <TextInput
          style={[{ flex: 1, paddingVertical: sizes.padding }, inputStyle]}
          placeholderTextColor={colors.hint}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {hint && (
          <View style={{ paddingLeft: 8 }}>
            {typeof hint === 'string' ? (
              <Text style={{ color: colors.hint, fontSize: 12 }}>{hint}</Text>
            ) : (
              hint
            )}
          </View>
        )}
        {isPassword && (
          <Pressable onPress={togglePassword}>
            <Text
              style={[
                {
                  fontWeight: '500',
                  paddingLeft: 8,
                },
                { color: colors.text },
              ]}
            >
              <ToggleIcon
                size={20}
                color={iconColor as string}
                style={{
                  marginTop: -4,
                  marginRight: 2,
                }}
              />
            </Text>
          </Pressable>
        )}
        {hasError && errorMessage && (
          <Text style={{ color: colors.danger, fontSize: 12, marginTop: 4 }}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
}
