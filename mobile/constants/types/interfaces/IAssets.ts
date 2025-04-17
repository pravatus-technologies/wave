/**
 *
 * IAssets
 *
 * An interface that defines the assets that are required by
 * the application. Different themes must have these assets
 * defined.
 */

import { ImageSourcePropType } from 'react-native';

export interface IAssets {
  appLogo: ImageSourcePropType;
  appSplashLogo: ImageSourcePropType;
  appSplashScreen: ImageSourcePropType;
  appFavicon: ImageSourcePropType;
  appAdaptiveIcon: ImageSourcePropType;
}
