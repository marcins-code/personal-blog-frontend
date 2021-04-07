import { commonColors } from 'themes/commonElements/commonColors';

export const commonColorSchemes = {
  grey200: 'hsl(0, 0%, 90%)',
  grey300: 'hsl(0, 0%, 70%)',
  grey400: 'hsl(0, 0%, 60%)',
  grey500: 'hsl(0, 0%, 50%)',
  grey600: 'hsl(0, 0%, 40%)',
  grey700: 'hsl(0, 0%, 30%)',
  grey800: 'hsl(0, 0%, 20%)',
  grey900: 'hsl(0, 0%, 10%)',
  black: 'hsl(0,0%,0%)',
  blackHalf: 'rgba(0,0,0,.5)',
  whiteHalf: 'rgba(255, 255, 255,.5)',
  chocolate: '#622c1e',
  chocolateDark: '#421a10',
  dark: '#403f3f',
  darkDarken: '#171717',
  light: '#b3b3b3',
  lightDark: '#808080',
  blue: '#006ba9',
  blueDark: '#004a75',
  wax: '#2b2b2b',
  success: {
    backgroundColor: commonColors.green,
    backgroundColorDarken: commonColors.greenDark,
    color: commonColors.grey200,
  },
  danger: {
    backgroundColor: commonColors.red,
    backgroundColorDarken: commonColors.redDark,
    color: commonColors.grey200,
  },

  warning: {
    backgroundColor: commonColors.yellow,
    backgroundColorDarken: commonColors.yellowDark,
    color: commonColors.grey200,
  },
  info: {
    backgroundColor: commonColors.blue,
    backgroundColorDarken: commonColors.blueDark,
    color: commonColors.grey200,
  },

  darken: {
    backgroundColor: commonColors.dark,
    backgroundColorDarken: commonColors.darkDarken,
    color: commonColors.grey200,
  },
  lighten: {
    backgroundColor: commonColors.light,
    backgroundColorDarken: commonColors.light,
    color: commonColors.grey800,
  },
};
