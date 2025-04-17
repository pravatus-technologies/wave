/***
 *
 * IBaseTheme
 *
 * An interface that defines everything a theme needs to define. This
 * makes sure that all themes have the same properties and structure
 */

import { ScaledSize } from 'react-native';

import { IAssets } from './IAssets';
import { IFontFaces } from './IFontFaces';
import { IFonts } from './IFonts';
import { IFontSizes } from './IFontSizes';
import { IFontWeights } from './IFontWeights';

export interface IBaseTheme {
  fonts: IFonts;
  fontWeights: IFontWeights;
  fontFaces: IFontFaces;
  fontSizes: IFontSizes;

  assets: IAssets;

  sizes: {
    width: ScaledSize['width'];
    height: ScaledSize['height'];
  };
}
