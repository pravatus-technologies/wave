import { ITheme } from '../../../../constants/types/ITheme';

export interface IThemeProvider {
  children?: React.ReactNode;
  theme?: ITheme;
  setTheme?: (theme?: ITheme) => void;
}
