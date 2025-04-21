import { IColors, IGradients, ITheme } from '@constants/types/interfaces';
import { ISizes } from '@constants/types/interfaces/ISizes';
import { ISpacing } from '@constants/types/interfaces/ISpacing';

import { BASE as baseTheme } from './base';

export const COLORS: IColors = {
  // primary text color
  text: '#3c3c3c',
  // input box placeholder text color
  hint: '#909090',

  primary: '#51BEF6',
  secondary: '#813DFE',
  tertiary: '#3DBBFE',

  black: '#000000',
  white: '#FFFFFF',

  dark: '#5D5D5D',
  light: '#E9ECEF',

  gray: '#A1A1A1',

  danger: '#FF5151',
  warning: '#FFA851',
  success: '#51FF8B',
  info: '#51F3FF',

  // card and tile colors
  card: '#FFFFFF',
  background: '#F5F7FA',
  border: '#EBEBEB',

  // control colors
  shadow: '#000000',
  overlay: 'rgba(0,0,0,0.3)',
  focus: '#3DBBFE',
  input: '#252F40',
  switchOn: '#3A416F',
  switchOff: '#E9ECEF',
  checkbox: ['#3A416F', '#141727'],
  checkboxIcon: '#FFFFFF',

  // social colors
  facebook: '#3B5998',
  twitter: '#55ACEE',
  dribbble: '#EA4C89',

  // icon tint color
  icon: '#8392AB',

  // blur tint color
  blurTint: 'light',

  // product link color
  link: '#5A8DEE',
};

export const GRADIENTS: IGradients = {
  primary: ['#813DFE', '#3D5AFE', '#3DBBFE'],
  secondary: ['#3D5AFE', '#51FF8B', '#EA4C89'],
  info: ['#21D4FD', '#2152FF'],
  success: ['#98EC2D', '#17AD37'],
  warning: ['#FBCF33', '#F53939'],
  danger: ['#FF667C', '#EA0606'],

  light: ['#EBEFF4', '#CED4DA'],
  dark: ['#3A416F', '#141727'],

  white: [String(COLORS.white), '#EBEFF4'],
  black: [String(COLORS.black), '#141727'],

  divider: ['rgba(255,255,255,0.3)', 'rgba(102, 116, 142, 0.6)'],
  menu: ['rgba(255, 255, 255, 0.2)', 'rgba(112, 125, 149, 0.5)', 'rgba(255, 255, 255, 0.2)'],
};

export const SIZES: ISizes = {
  // top header height
  headerHeight: 60,

  // global sizes
  base: 10,
  text: 14,
  radius: 15,
  padding: 10,

  // font sizes
  h1: 28,
  h2: 24,
  h3: 22,
  h4: 20,
  h5: 18,
  p: 14,

  // button sizes
  buttonBorder: 1,
  buttonRadius: 15,
  socialSize: 64,
  socialRadius: 25,
  socialIconSize: 26,

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  // input sizes
  inputHeight: 45,
  inputBorder: 1,
  inputRadius: 15,
  inputPadding: 12,

  // card sizes
  cardRadius: 15,
  cardPadding: 10,

  imageRadius: 15,

  avatarSize: 35,
  avatarRadius: 12,
  miniAvatar: 12,

  welcomeAvatar: 50,
  selfieAvatar: 200,

  // switch sizes
  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,

  // checkbox sizes
  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,

  // product link size
  linkSize: 12,

  //font size multiplier: for maxFontSizeMultiplier prop
  multiplier: 2,
};

export const SPACING: ISpacing = {
  /** xs: 4px */
  xs: SIZES.base * 0.5,
  /** s: 8px */
  s: SIZES.base * 1,
  /** sm: 16px */
  sm: SIZES.base * 2,
  /** m: 24px */
  m: SIZES.base * 3,
  /** md: 32px */
  md: SIZES.base * 4,
  /** l: 40px */
  l: SIZES.base * 5,
  /** xl: 48px */
  xl: SIZES.base * 6,
  /** xxl: 56px */
  xxl: SIZES.base * 7,
};

export const LIGHT: ITheme = {
  ...baseTheme,
  colors: COLORS,
  gradients: GRADIENTS,
  sizes: { ...SIZES, ...baseTheme.sizes, ...SPACING },
  weights: baseTheme.fontWeights,
  lines: baseTheme.fontSizes,
};
