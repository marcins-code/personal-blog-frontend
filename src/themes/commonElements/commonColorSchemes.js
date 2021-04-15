import { commonColors } from 'themes/commonElements/commonColors';
import { backgroundImages } from 'themes/commonElements/backgroundImages';
import { rgba } from 'polished';

const commonSchemes = {
  globalBackgrounImage: backgroundImages.ironGrip,
  globalBackgroundColor: rgba(commonColors.black, 0.95),
  ironGrip: backgroundImages.ironGrip,
};

export const commonColorsAndSchemes = { ...commonSchemes, ...commonColors };
