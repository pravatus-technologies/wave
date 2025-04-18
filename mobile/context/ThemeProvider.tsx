import { light } from '@constants';
import React, { createContext, useContext } from 'react';

import { ITheme, IThemeProvider } from '@constants/types';

export const ThemeContext = createContext({
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
  const { theme } = useContext(ThemeContext);
  return theme;
}
