import React, { useState, useEffect } from 'react';
import useWindowSize from 'hooks/useWindowSize';
import PageContext from 'context';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import PropTypes from 'prop-types';
import {
  commonTheme, darkTheme, lightTheme, chocoladeTheme,
} from 'themes/Theme';

const GlobalTemplate = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [appTheme, setAppTheme] = useState('dark');
  const [sidebarTheme, setSidebarTheme] = useState('dark');
  const [navPosition, setNavPosition] = useState('menu-top');
  const [lang, setLang] = useState('pl');
  const size = useWindowSize();
  useEffect(() => {
    setIsMobile(size.width <= 760);
  }, [size]);

  const appThemeHandler = (e) => {
    setAppTheme(e.target.value);
  };

  const sidebarThemeHandler = (e) => {
    setSidebarTheme(e.target.value);
  };

  const navPositionHandler = (e) => {
    setNavPosition(e.target.checked ? 'sidebar' : 'menu-top');
  };

  const langSwitchHandler = (e) => {
    setLang(e.target.checked ? 'en' : 'pl');
  };

  let theme;
  switch (sidebarTheme) {
    case 'dark': {
      theme = { ...commonTheme, ...darkTheme };
      break;
    }

    case 'light': {
      theme = { ...commonTheme, ...lightTheme };
      break;
    }

    case 'chocolade': {
      theme = { ...commonTheme, ...chocoladeTheme };
      break;
    }

    default:
      theme = { ...commonTheme, ...darkTheme };
  }

  return (
    <PageContext.Provider
      value={{
        isMobile,
        appTheme,
        sidebarTheme,
        navPosition,
        lang,
        appThemeHandler,
        sidebarThemeHandler,
        navPositionHandler,
        langSwitchHandler,
      }}
    >
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>{children}</>
      </ThemeProvider>
    </PageContext.Provider>
  );
};

GlobalTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
export default GlobalTemplate;
