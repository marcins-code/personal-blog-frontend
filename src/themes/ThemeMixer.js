import { chocolateTheme, darkTheme, lightTheme } from 'themes/elements/appThemes';
import { commonColorsAndSchemes } from 'themes/commonElements/commonColorSchemes';

export const ThemeMixer = (appTheme, initSettings) => {
  let theme;
  switch (appTheme) {
    case 'dark': {
      theme = { ...commonColorsAndSchemes, ...darkTheme };
      break;
    }

    case 'light': {
      theme = { ...commonColorsAndSchemes, ...lightTheme };
      break;
    }

    case 'chocolate': {
      theme = { ...commonColorsAndSchemes, ...chocolateTheme };
      break;
    }

    default:
      theme = { ...commonColorsAndSchemes, ...initSettings.appTheme };
  }
  return theme;
};
