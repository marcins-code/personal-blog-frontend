import { chocolateTheme, darkTheme, lightTheme } from 'themes/elements/appThemes';

import { sidebarThemes } from 'themes/elements/sidebarThemes';
import { commonColors } from 'themes/commonElements/commonColors';

export const ThemeMixer = (appTheme, sidebarTheme, initSettings) => {
  let theme;
  switch (appTheme) {
    case 'dark': {
      theme = { ...commonColors, ...darkTheme };
      break;
    }

    case 'light': {
      theme = { ...commonColors, ...lightTheme };
      break;
    }

    case 'chocolate': {
      theme = { ...commonColors, ...chocolateTheme };
      break;
    }

    default:
      theme = { ...commonColors, ...initSettings.appTheme };
  }

  const sidebar = sidebarThemes[sidebarTheme] || sidebarThemes[initSettings.sidebarTheme];

  const fullTheme = { ...theme, ...sidebar };
  return fullTheme;
};
