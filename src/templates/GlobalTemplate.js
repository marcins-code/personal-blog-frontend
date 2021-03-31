import React, { useState, useEffect, useRef } from 'react';
import useWindowSize from 'hooks/useWindowSize';
import { PageContext } from 'context';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import PropTypes from 'prop-types';
import {
  commonTheme, chocolateTheme, darkTheme, lightTheme,
} from 'themes/Theme';
import { useLocation } from 'react-router-dom';

const GlobalTemplate = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [appTheme, setAppTheme] = useState('chocolate');
  const [sidebarTheme, setSidebarTheme] = useState('blue');
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [navPosition, setNavPosition] = useState('sidebar');
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
  const prevNavPosition = useRef();
  useEffect(() => {
    prevNavPosition.current = navPosition;
  });

  const navPositionHandler = (e) => {
    setNavPosition(e.target.checked ? 'sidebar' : 'menu-top');
  };

  const sidebarThemeHandler = (e) => {
    setSidebarTheme(e.target.dataset.sidebartheme);
  };

  // lanquage switching
  const langSwitchHandler = (e) => {
    setLang(e.target.checked ? 'en' : 'pl');
  };

  const location = useLocation();
  useEffect(() => {
    const regex = /^\/admin/g;
    const found = location.pathname.match(regex);
    setIsAdminPage(Boolean(found));
  }, [location]);

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
        isAdminPage,
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
