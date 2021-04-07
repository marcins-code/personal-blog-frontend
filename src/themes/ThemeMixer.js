import { chocolateTheme, darkTheme, lightTheme } from 'themes/elements/appThemes';

import { sidebarThemes } from 'themes/elements/sidebarThemes';
import { commonColorSchemes } from 'themes/commonElements/commonColorSchemes';

export const ThemeMixer = (appTheme, sidebarTheme, initSettings) => {
  let theme;
  switch (appTheme) {
    case 'dark': {
      theme = { ...commonColorSchemes, ...darkTheme };
      break;
    }

    case 'light': {
      theme = { ...commonColorSchemes, ...lightTheme };
      break;
    }

    case 'chocolate': {
      theme = { ...commonColorSchemes, ...chocolateTheme };
      break;
    }

    default:
      theme = { ...commonColorSchemes, ...initSettings.appTheme };
  }

  const sidebar = sidebarThemes[sidebarTheme] || sidebarThemes[initSettings.sidebarTheme];

  const fullTheme = { ...theme, ...sidebar };
  console.log(fullTheme);
  return fullTheme;
};
