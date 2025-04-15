import React from 'react';

import { light } from '@constants';
import { ITheme, IThemeProvider } from '@constants/types';

export const ThemeContext = React.createContext({
  theme: light,
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  theme = light,
  setTheme = () => {},
}: IThemeProvider): JSX.Element => {
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ITheme {
  const { theme } = React.useContext(ThemeContext);
  return theme;
}
