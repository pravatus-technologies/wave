import * as LucideIcons from 'lucide-react-native';
import { LucideIcon } from 'lucide-react-native';

export const icons: Record<string, LucideIcon> = {};

/***
 *
 * Turns the imported LucideIcons object into an array of [key, value] paris.
 * Object.entries() turns it into:
 *
 * [["Bell", BellComponent], ["User", UserComponent], ...]
 *
 * .forEach(([name, IconComponent])) loops through each pair, and destructures
 * it name="Bell", IconComponent = BellComponent
 *
 * icons[name.toLowerCase()] = IconComponent as LucideIcon converts "Bell" to "bell"
 * for consistent lowercase usage and adds it tothe "icons" object
 *
 * icons["bell"] = BellComponent
 */
Object.entries(LucideIcons).forEach(([name, IconComponent]) => {
  icons[name.toLowerCase()] = IconComponent as LucideIcon;
});
