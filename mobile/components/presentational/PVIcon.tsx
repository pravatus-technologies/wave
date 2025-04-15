import { ColorValue, StyleProp, ViewStyle } from 'react-native';

import * as LucideIcons from 'lucide-react-native';
import React from 'react';

import { PVIconProps } from '@constants/types';
import { useTheme } from '@context';
import { Logger } from '@utils/Logger';

export default function PVIcon({
  name,
  size = 24,
  color = '#000',
  style,
}: PVIconProps): React.ReactNode {
  const { colors } = useTheme();

  const LucideIcon = LucideIcons[name] as React.ComponentType<{
    color?: ColorValue;
    size?: number;
    style?: StyleProp<ViewStyle>;
  }>;

  if (!LucideIcon) {
    Logger.warn(
      new Error('Unknown Icon'),
      'Icon',
      `Icon "${name}" not found in lucide-react-native.`
    );
    return null;
  }

  return <LucideIcon color={color ?? colors.text} size={size} style={style} />;
}
