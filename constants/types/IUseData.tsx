import { ITheme } from "./ITheme";

export interface IUseData {
  isDark: boolean;
  theme: ITheme;
  handleIsDark: (isDark?: boolean) => void;
  setTheme: (theme?: ITheme) => void;
}
