// import bodyBackgroundImage from 'assets/images/backgrounds/black-orchid.png';
import { commonColors } from 'themes/commonElements/commonColors';
import { backgroundImages } from 'themes/commonElements/backgroundImages';

export const darkTheme = {
  backgroundsBody: {
    backgrounImage: backgroundImages.hexellence,
    backgroundColor: commonColors.darkDarken,
  },
  backgroundsApp: {
    backgrounImage: backgroundImages.blackOrchid,
    backgroundColor: commonColors.dark,
    boxShadowColor: 'rgba(0,0,0,.9)',
  },
  color: commonColors.grey200,
  primary: {
    backgroundColor: commonColors.blue,
    backgroundColorDarken: commonColors.blueDark,
    color: commonColors.grey200,
  },
  secondary: {
    backgroundColor: commonColors.orangeDark,
    backgroundColorDarken: '#064f41',
    color: commonColors.grey00,
  },
};

export const lightTheme = {
  backgroundsBody: {
    backgrounImage: backgroundImages.hexellenceMore,
    backgroundColor: commonColors.grey600,
  },
  backgroundsApp: {
    backgrounImage: backgroundImages.textile,
    backgroundColor: commonColors.light,
    textShadowColor: 'rgba(40,40,40,.6)',
  },
  color: commonColors.wax,
  primary: {
    backgroundColor: commonColors.purple,
    backgroundColorDarken: '#523076',
    color: commonColors.grey200,
  },
  secondary: {
    backgroundColor: commonColors.green,
    backgroundColorDarken: '#064f41',
    color: commonColors.grey100,
  },
};

export const chocolateTheme = {
  backgroundsBody: {
    backgrounImage: backgroundImages.hexellence,
    backgroundColor: commonColors.darkDarken,
  },
  backgroundsApp: {
    backgrounImage: backgroundImages.blackOrchid,
    backgroundColor: commonColors.chocolate,
    boxShadowColor: 'rgba(0,0,0,.9)',
  },
  color: commonColors.grey200,
  primary: {
    backgroundColor: commonColors.cyan,
    backgroundColorDarken: '#523076',
    color: commonColors.grey200,
  },
  secondary: {
    backgroundColor: commonColors.orangeDark,
    backgroundColorDarken: '#064f41',
    color: commonColors.grey100,
  },
};
