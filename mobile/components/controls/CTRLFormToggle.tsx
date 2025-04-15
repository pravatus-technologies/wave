import {
  View,
  Text,
  StyleSheet,
  Switch,
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';

import React from 'react';

import { useTheme } from '@context';

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

export default function CTRLFormToggle({
  label,
  value,
  onValueChange,
  containerStyle,
  labelStyle,
  switchColor = {
    true: '#34C759', // iOS green
    false: '#ccc',
    thumb: '#ffffff',
  },
}: Props): JSX.Element {
  const { colors } = useTheme();

  switchColor = {
    true: colors.primary,
    false: colors.switchOff,
    thumb: switchColor.thumb,
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
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});
