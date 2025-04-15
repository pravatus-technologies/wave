/**
 * Theme Assets interface
 */
import { ImageSourcePropType } from 'react-native';

import { FontSource } from 'expo-font';

export interface ThemeAssets {
  OpenSansLight?: FontSource;
  OpenSansRegular?: FontSource;
  OpenSansSemiBold?: FontSource;
  OpenSansExtraBold?: FontSource;
  OpenSansBold?: FontSource;

  logo: ImageSourcePropType;
  logoText: ImageSourcePropType;
}
