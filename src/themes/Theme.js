import bodyBackgroundImage from 'assets/images/black-orchid.png';
import bodyBackgroundImageLigth from 'assets/images/iron-grip.png';
import sidebar1 from 'assets/images/sidebar1_2.jpg';

const colors = {
  grey100: 'hsl(0, 0%, 96%)',
  grey200: 'hsl(0, 0%, 90%)',
  grey300: 'hsl(0, 0%, 70%)',
  black: 'hsl(0,0%,0%)',
  chocolade: {
    backgroundColor: '#6F2F1E',
    backgroundDarken: '#080200',
  },
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
  light: {
    backgroundColor: '#D7D7D7',
    backgroundDarken: '#A7A7A7',
    color: '#1E1E1E',
  },
  dark: {
    backgroundColor: '#5B5A5A',
    backgroundDarken: '#414040',
  },
  backgroundImages: {
    sidebar1,
  },
};

const common = {
  light: 300,
  bold: 600,
  fontSize: {
    xxs: '1rem',
    xs: '1.2rem',
    s: '1.6rem',
    m: '2.1rem',
    l: '2.4rem',
    xl: '4rem',
  },
};

export const commonTheme = { ...common, ...colors };

export const darkTheme = {
  backgrounImage: bodyBackgroundImage,
  background: '#414345',
  color: colors.grey200,
};

export const lightTheme = {
  backgrounImage: bodyBackgroundImageLigth,
  background: '#808080',
  color: '#000',
};

export const chocoladeTheme = {
  backgrounImage: bodyBackgroundImage,
  background: colors.chocolade.backgroundColor,
  color: colors.grey200,
};
