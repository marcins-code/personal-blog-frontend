import { commonColors } from 'themes/commonElements/commonColors';
import { backgroundImages } from 'themes/commonElements/backgroundImages';
import { complement, darken } from 'polished';

export const darkTheme = {
  themeName: 'dark',
  appBackgrounImage: backgroundImages.blackOrchid,
  appBackgroundColor: commonColors.dark,
  appBoxShadowColor: 'rgba(0,0,0,.9)',
  menuBackgrounImage: backgroundImages.debutLight,
  menuTextShadow:
    '0px 0px 0 rgb(135, 135, 135), 1px 1px 0 rgb(24, 24, 24), 1px 1px 0 rgb(-86, -86, -86)',
  color: commonColors.grey200,
  primary: commonColors.blue,
  secondary: complement(commonColors.blue),
  success: commonColors.green,
  info: commonColors.cyan,
  danger: commonColors.red,
  warning: commonColors.yellow,
};

export const lightTheme = {
  themeName: 'light',
  appBackgrounImage: backgroundImages.textile,
  appBackgroundColor: commonColors.light,
  appBoxShadowColor: 'rgba(20,20,20,.9)',
  menuBackgrounImage: backgroundImages.blackPaper,
  menuTextShadow:
    '0px 0px 0 rgb(235, 235, 235), 1px 1px 0 rgb(124,124, 124), 1px 1px 0 rgb(-86, -86, -86)',
  color: commonColors.grey900,
  primary: commonColors.cyan,
  secondary: complement(commonColors.cyan),
  success: commonColors.green,
  info: commonColors.cyan,
  danger: commonColors.red,
  warning: commonColors.yellow,
};

export const chocolateTheme = {
  themeName: 'chocolate',
  appBackgrounImage: backgroundImages.blackOrchid,
  appBackgroundColor: commonColors.chocolate,
  appBoxShadowColor: 'rgba(0,0,0,.9)',
  menuBackgrounImage: backgroundImages.debutLight,
  menuTextShadow:
    '0px 0px 0 rgb(135, 135, 135), 1px 1px 0 rgb(24, 24, 24), 1px 1px 0 rgb(-86, -86, -86)',
  color: commonColors.grey200,
  primary: commonColors.teal,
  secondary: darken(0.3, complement(commonColors.teal)),
  success: commonColors.green,
  info: commonColors.cyan,
  danger: commonColors.red,
  warning: commonColors.yellow,
};
