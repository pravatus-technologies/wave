import { ITheme } from "../theme";

export interface IUseData {
  isDark: boolean;
  handleIsDark: (isDark?: boolean) => void;
  setTheme: (theme?: ITheme) => void;
}
