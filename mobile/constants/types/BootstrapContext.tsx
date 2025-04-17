import { ITheme } from './interfaces';

export type BootstrapContextType = {
  isReady: boolean;
  env: 'development' | 'preview' | 'production';
  isDark: boolean;
  theme: ITheme;
  handleIsDark: (isDark: boolean) => void;
  setTheme: (theme: ITheme) => void;
};
