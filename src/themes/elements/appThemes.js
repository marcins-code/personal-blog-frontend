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
    backgroundColor: '#ff7d00',
    backgroundColorDarken: '#4f1c06',
    color: commonColors.wax,
  },
  secondary: {
    backgroundColor: '#b267ff',
    backgroundColorDarken: '#064f41',
    color: commonColors.wax,
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
};
