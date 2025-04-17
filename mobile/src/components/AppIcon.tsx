import { HelpCircle } from 'lucide-react-native';
import React from 'react';

import { icons } from '@constants';
import { IAppIconProps } from '@constants/interfaces';

/***
 * AppIcon
 *
 * The component that encapsulates icon definition. It accepts an object
 * of IAppIconProps that has a "name" property and all other properties
 * of LucideIcon to customize things such as color, sizes etc...
 */
export default function AppIcon({ name, ...props }: IAppIconProps): React.ReactNode {
  const Icon = icons[name.toLowerCase()];

  if (!Icon) {
    if (__DEV__) console.warn(`Icon ${name} not found in icons map.`);
    return <HelpCircle color="red" {...props} />;
  }

  return <Icon {...props} />;
}
