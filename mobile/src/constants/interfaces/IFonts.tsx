/***
 *
 * IFonts
 *
 * An interface that defines the fonts being used by the application.
 * We don't support changing the font and not even sure if we want to
 * do that, but each typeface has different weights etc that need
 * to be defined
 */

import { FontSource } from 'expo-font';

export interface IFonts {
  LightFont: FontSource;
  RegularFont: FontSource;
  SemiBoldFont: FontSource;
  ExtraBoldFont: FontSource;
  BoldFont: FontSource;
}
