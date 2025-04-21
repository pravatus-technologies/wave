import { SafeAreaView, StyleSheet, ViewProps } from 'react-native';

import { useTheme } from '@context';

export default function Screen({ children, style }: ViewProps): JSX.Element {
  const { sizes, colors } = useTheme();

  const screenStyle = StyleSheet.flatten([
    style,
    {
      flex: 1,
      paddingHorizontal: sizes.padding,
      backgroundColor: colors.background,
    },
  ]);
  return <SafeAreaView style={screenStyle}>{children}</SafeAreaView>;
}
