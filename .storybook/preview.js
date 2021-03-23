import React from 'react';
import { ThemeProvider } from 'styled-components';
import { commonTheme, darkTheme } from '../src/themes/Theme';
import GlobalStyle from '../src/themes/GlobalStyle';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);
const theme = { ...darkTheme, ...commonTheme };

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#2C2D2E',
      },
      {
        name: 'light',
        value: '#747474',
      },
    ],
  },
};
