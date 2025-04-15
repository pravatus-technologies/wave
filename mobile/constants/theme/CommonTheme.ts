import { ScaledSize } from 'react-native';

import { ThemeAssets, ThemeFonts, ThemeWeights, ThemeLineHeights, ThemeIcons } from './';

/**
 * Common Theme interface
 */
export interface ICommonTheme {
  assets: ThemeAssets;
  icons: ThemeIcons;
  fonts: ThemeFonts;
  weights: ThemeWeights;
  lines: ThemeLineHeights;
  sizes: {
    width: ScaledSize['width'];
    height: ScaledSize['height'];
  };
}
