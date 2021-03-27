import React, { useState, useEffect, useRef } from 'react';
import useWindowSize from 'hooks/useWindowSize';
import PageContext from 'context';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import PropTypes from 'prop-types';
import {
  commonTheme, chocolateTheme, darkTheme, lightTheme,
} from 'themes/Theme';

const GlobalTemplate = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  // const [isLayotChanged, setIsLayotChanged] = useState(false);
  const [appTheme, setAppTheme] = useState('dark');
  const [sidebarTheme, setSidebarTheme] = useState('dark');
  const [navPosition, setNavPosition] = useState('menu-top');
  const [lang, setLang] = useState('pl');
  const size = useWindowSize();

  // setting window size
  useEffect(() => {
    setIsMobile(size.width <= 760);
  }, [size]);

  // set app theme
  const appThemeHandler = (e) => {
    setAppTheme(e.target.dataset.apptheme);
  };

  // set app layout
  // const layoutChangeIndictator = () => setIsLayotChanged(true);
  const prevNavPosition = useRef();
  useEffect(() => {
    prevNavPosition.current = navPosition;
  });

  const navPositionHandler = (e) => {
    setNavPosition(e.target.checked ? 'sidebar' : 'menu-top');
  };

  const sidebarThemeHandler = (e) => {
    setSidebarTheme(e.target.value);
  };

  const langSwitchHandler = (e) => {
    setLang(e.target.checked ? 'en' : 'pl');
  };

  let theme;
  switch (appTheme) {
    case 'dark': {
      theme = { ...commonTheme, ...darkTheme };
      break;
    }

    case 'light': {
      theme = { ...commonTheme, ...lightTheme };
      break;
    }

    case 'chocolate': {
      theme = { ...commonTheme, ...chocolateTheme };
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
        prevNavPosition: prevNavPosition.current,
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
