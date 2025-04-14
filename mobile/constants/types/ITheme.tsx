import {
  ICommonTheme,
  ThemeAssets,
  ThemeColors,
  ThemeFonts,
  ThemeGradients,
  ThemeIcons,
  ThemeLineHeights,
  ThemeSizes,
  ThemeSpacing,
  ThemeWeights,
} from "../theme";

export interface ITheme {
  colors: ThemeColors;
  icons: ThemeIcons;
  gradients: ThemeGradients;
  sizes: ThemeSizes & ThemeSpacing & ICommonTheme["sizes"];
  assets: ThemeAssets;
  fonts: ThemeFonts;
  weights: ThemeWeights;
  lines: ThemeLineHeights;
}
