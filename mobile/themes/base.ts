/***
 *
 * base.ts Base Theme
 *
 * This is the base theme. It includes all common settings that
 * is shared between other theems such as light and dark.
 */
import { Dimensions, Platform } from 'react-native';

import {
  IAssets,
  IBaseTheme,
  IFontFaces,
  IFonts,
  IFontSizes,
  IFontWeights,
} from '@constants/types/interfaces';

// Import all fonts from the assets folder
import BoldFont from '../assets/fonts/OpenSans-Bold.ttf';
import ExtraBoldFont from '../assets/fonts/OpenSans-ExtraBold.ttf';
import LightFont from '../assets/fonts/OpenSans-Light.ttf';
import RegularFont from '../assets/fonts/OpenSans-Regular.ttf';
import SemiBoldFont from '../assets/fonts/OpenSans-SemiBold.ttf';
// Import all logo and images for the app from the assets folder
import AppAdaptiveIcon from '../assets/images/adaptive-icon.png';
import AppFavicon from '../assets/images/favicon.png';
import AppLogo from '../assets/images/logo.png';
import AppSplashLogo from '../assets/images/splash-icon.png';
import AppSplashScreen from '../assets/images/splash.png';

import FbLogo from '../assets/external/fb.png';
import GoogleLogo from '../assets/external/google.png';
import xLogo from '../assets/external/x.png';

// Define the width and height for the screen
const { width, height } = Dimensions.get('window');

// Use all fonts imported from the assets folder
export const FONTS: IFonts = {
  LightFont,
  RegularFont,
  SemiBoldFont,
  ExtraBoldFont,
  BoldFont,
};

// Define what weight to use for each fotn element
export const WEIGHTS: IFontWeights = {
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

// Define font faces to be used for each type of text element
export const FONT_FACES: IFontFaces = {
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

// Define standard sizing across the app
export const FONT_SIZES: IFontSizes = {
  // font lineHeight
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 33,
  h5: 24,
  p: 22,
};

// Define app assets such as logo and other images
export const ASSETS: IAssets = {
  appLogo: AppLogo,
  appSplashLogo: AppSplashLogo,
  appSplashScreen: AppSplashScreen,
  appFavicon: AppFavicon,
  appAdaptiveIcon: AppAdaptiveIcon,

  fbLogo: FbLogo,
  googleLogo: GoogleLogo,
  xLogo: xLogo,
};

// export the base theme settings
export const BASE: IBaseTheme = {
  fonts: FONTS,
  fontWeights: WEIGHTS,
  fontFaces: FONT_FACES,
  fontSizes: FONT_SIZES,

  assets: ASSETS,
  sizes: {
    width: width,
    height: height,
  },
};
