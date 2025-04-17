import { Text, ActivityIndicator, TouchableOpacity, View } from 'react-native';

import React from 'react';

import { FormButtonProps } from '@constants/types';
import { useTheme } from '@context';
import { hexToRgba } from '@utils/hexToRgba';

export default function FormButton({
  title,
  onPress,
  outline = false,
  loading = false,
  disabled = false,
  containerStyle,
  buttonStyle,
  textStyle,
  textColor,
  spinnerColor = '#ffffff',
}: FormButtonProps): JSX.Element {
  const { colors, sizes } = useTheme();
  const isDisabled = disabled || loading;
  return (
    <View style={[{ marginVertical: sizes.s }, containerStyle]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[
          {
            height: sizes.l,
            backgroundColor: isDisabled
              ? hexToRgba(colors.primary as string, 0.6)
              : outline
                ? 'transparent'
                : colors.primary,
            paddingVertical: 8,
            paddingHorizontal: 24,

            borderWidth: 1,
            borderColor: loading ? colors.gray : colors.primary,
            borderRadius: sizes.radius,
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
        <Text
          style={[
            { color: outline ? colors.primary : (textColor ?? colors.white), fontWeight: 'bold' },
            textStyle,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
