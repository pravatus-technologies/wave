import { LucideProps } from 'lucide-react-native';

/***
 * IAppIconProps
 *
 * Extend the properties of LucideProps and add a name
 */
export interface IAppIconProps extends LucideProps {
  name: string;
}
