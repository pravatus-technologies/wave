import { Dimensions, Platform } from 'react-native';

import { Bell } from 'lucide-react-native';

import {
  ThemeAssets,
  ThemeIcons,
  ICommonTheme,
  ThemeFonts,
  ThemeLineHeights,
  ThemeWeights,
} from '@constants/theme';

import OpenSansBold from '../../assets/fonts/OpenSans-Bold.ttf';
import OpenSansExtraBold from '../../assets/fonts/OpenSans-ExtraBold.ttf';
import OpenSansLight from '../../assets/fonts/OpenSans-Light.ttf';
import OpenSansRegular from '../../assets/fonts/OpenSans-Regular.ttf';
import OpenSansSemiBold from '../../assets/fonts/OpenSans-SemiBold.ttf';
import logoText from '../../assets/images/logo-text.png';
import logo from '../../assets/images/logo.png';

const { width, height } = Dimensions.get('window');

export const WEIGHTS: ThemeWeights = {
  text: 'normal',
  h1: Platform.OS === 'ios' ? '700' : 'normal',
  h2: Platform.OS === 'ios' ? '700' : 'normal',
  h3: Platform.OS === 'ios' ? '700' : 'normal',
  h4: Platform.OS === 'ios' ? '700' : 'normal',
  h5: Platform.OS === 'ios' ? '600' : 'normal',
  p: 'normal',

  thin: Platform.OS === 'ios' ? '100' : 'normal',
  extralight: Platform.OS === 'ios' ? '200' : 'normal',
  light: Platform.OS === 'ios' ? '300' : 'normal',
  normal: Platform.OS === 'ios' ? '400' : 'normal',
  medium: Platform.OS === 'ios' ? '500' : 'normal',
  semibold: Platform.OS === 'ios' ? '600' : 'normal',
  bold: Platform.OS === 'ios' ? '700' : 'normal',
  extrabold: Platform.OS === 'ios' ? '800' : 'normal',
  black: Platform.OS === 'ios' ? '900' : 'normal',
};

export const ASSETS: ThemeAssets = {
  // fonts
  OpenSansLight,
  OpenSansRegular,
  OpenSansSemiBold,
  OpenSansExtraBold,
  OpenSansBold,
  logo,
  logoText,
};

export const FONTS: ThemeFonts = {
  // based on font size
  text: 'OpenSans-Regular',
  h1: 'OpenSans-Bold',
  h2: 'OpenSans-Bold',
  h3: 'OpenSans-Bold',
  h4: 'OpenSans-Bold',
  h5: 'OpenSans-SemiBold',
  p: 'OpenSans-Regular',

  // based on fontWeight
  thin: 'OpenSans-Light',
  extralight: 'OpenSans-Light',
  light: 'OpenSans-Light',
  normal: 'OpenSans-Regular',
  medium: 'OpenSans-SemiBold',
  semibold: 'OpenSans-SemiBold',
  bold: 'OpenSans-Bold',
  extrabold: 'OpenSans-ExtraBold',
  black: 'OpenSans-ExtraBold',
};

export const LINE_HEIGHTS: ThemeLineHeights = {
  // font lineHeight
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 33,
  h5: 24,
  p: 22,
};

export const ICONS: ThemeIcons = {
  bell: Bell,
};

export const THEME: ICommonTheme = {
  assets: { ...ASSETS },
  icons: ICONS,
  fonts: FONTS,
  weights: WEIGHTS,
  lines: LINE_HEIGHTS,
  sizes: { width, height },
};
