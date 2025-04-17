import { IAssets } from './IAssets';
import { IBaseTheme } from './IBaseTheme';
import { IColors } from './IColors';
import { IFonts } from './IFonts';
import { IFontSizes } from './IFontSizes';
import { IFontWeights } from './IFontWeights';
import { IGradients } from './IGradients';
import { ISizes } from './ISizes';
import { ISpacing } from './ISpacing';

export interface ITheme {
  colors: IColors;
  gradients: IGradients;
  sizes: ISizes & ISpacing & IBaseTheme['sizes'];
  assets: IAssets;
  fonts: IFonts;
  weights: IFontWeights;
  lines: IFontSizes;
}
