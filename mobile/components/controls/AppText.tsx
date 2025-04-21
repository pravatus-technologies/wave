import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import { useTheme } from '@context';

interface AppTextProps extends TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  fontFamily?: string;
  bold?: boolean;
  semibold?: boolean;
  link?: boolean;
  color?: string;
}

export default function AppText({
  style,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  fontFamily,
  bold,
  semibold,
  color,
  link,
  children,
}: AppTextProps): JSX.Element {
  const { colors, sizes } = useTheme();
  const textStyles = StyleSheet.flatten([
    style,
    {
      ...{ fontFamily: 'OpenSans-Regular' },
      ...(fontFamily && { fontFamily: fontFamily }),
      ...(bold && { fontFamily: 'OpenSans-Bold' }),
      ...(semibold && { fontFamily: 'OpenSans-SemiBold' }),

      ...(h1 && { fontSize: sizes.h1 }),
      ...(h2 && { fontSize: sizes.h2 }),
      ...(h3 && { fontSize: sizes.h3 }),
      ...(h4 && { fontSize: sizes.h4 }),
      ...(h5 && { fontSize: sizes.h5 }),
      ...(p && { fontSize: sizes.p }),

      ...{ color: colors.text },
      ...(color && { color: color }),

      ...(link && { fontFamily: 'OpenSans-SemiBold', fontSize: sizes.p, color: colors.primary }),
    },
  ]) as TextStyle;

  return <Text style={textStyles}>{children}</Text>;
}
