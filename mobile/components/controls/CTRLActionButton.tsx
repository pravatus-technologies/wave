import { Pressable, Text, ActivityIndicator } from 'react-native';

import React from 'react';

import { PVActionButtonProps } from '@constants/types';
import { useTheme } from '@context';

export default function CTRLActionButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  textColor,
  spinnerColor = '#ffffff',
}: PVActionButtonProps): JSX.Element {
  const { colors } = useTheme();
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isDisabled ? 0.7 : 1,
        },
        buttonStyle,
      ]}
    >
      {loading && (
        <ActivityIndicator size="small" color={spinnerColor} style={{ marginRight: 8 }} />
      )}
      <Text style={[{ color: textColor ?? colors.white, fontWeight: 'bold' }, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}
