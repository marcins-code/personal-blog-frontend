import {
  commonTheme, chocolateTheme, darkTheme, lightTheme,
} from 'themes/Theme';

import { sidebars } from 'themes/elements/sidebars';

export const ThemeMixer = (appTheme, sidebarTheme, initSettings) => {
  let theme;
  switch (appTheme) {
    case 'dark': {
      theme = { ...commonTheme, ...darkTheme };
      break;
    }

    case 'light': {
      theme = { ...commonTheme, ...lightTheme };
      break;
    }

    case 'chocolate': {
      theme = { ...commonTheme, ...chocolateTheme };
      break;
    }

    default:
      theme = { ...commonTheme, ...initSettings.appTheme };
  }

  const sidebar = sidebars[sidebarTheme] || sidebars[initSettings.sidebarTheme];

  const fullTheme = { ...theme, ...sidebar };
  console.log(fullTheme);
  return fullTheme;
};
