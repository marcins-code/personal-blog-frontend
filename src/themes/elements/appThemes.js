// import bodyBackgroundImage from 'assets/images/backgrounds/black-orchid.png';
import { commonColors } from 'themes/commonElements/commonColors';
import { backgroundImages } from 'themes/commonElements/backgroundImages';

export const darkTheme = {
  backgroundsBody: {
    backgrounImage: backgroundImages.hexellence,
    backgroundColor: commonColors.dark.backgroundColorDarken,
  },
  backgroundsApp: {
    backgrounImage: backgroundImages.blackOrchid,
    backgroundColor: commonColors.dark.backgroundColor,
    boxShadowColor: 'rgba(0,0,0,.9)',
  },
  color: commonColors.grey200,
  primary: {
    backgroundColor: '#F39C12',
    backgroundDarken: '#e67e22',
  },
  secondary: {
    backgroundColor: '#00BBDC',
    backgroundDarken: '#0093AD',
  },
  tertiary: {
    backgroundColor: '#9C12F3',
    backgroundDarken: '#840FCD',
  },
};

export const lightTheme = {
  backgroundsBody: {
    backgrounImage: backgroundImages.hexellenceMore,
    backgroundColor: commonColors.light.backgroundColorDarken,
  },
  backgroundsApp: {
    backgrounImage: backgroundImages.textile,
    backgroundColor: commonColors.light.backgroundColor,
    boxShadowColor: 'rgba(40,40,40,.6)',
  },
  color: commonColors.wax,
};

export const chocolateTheme = {
  backgroundsBody: {
    backgrounImage: backgroundImages.hexellence,
    backgroundColor: commonColors.chocolate.backgroundColorDarken,
  },
  backgroundsApp: {
    backgrounImage: backgroundImages.blackOrchid,
    backgroundColor: commonColors.chocolate.backgroundColor,
    boxShadowColor: 'rgba(0,0,0,.9)',
  },
  color: commonColors.grey200,
};
