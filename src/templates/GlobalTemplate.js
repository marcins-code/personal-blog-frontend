import React from 'react';
import { PageContext } from 'context';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import PropTypes from 'prop-types';
import {
  commonTheme, chocolateTheme, darkTheme, lightTheme,
} from 'themes/Theme';
import { NotificationContainer } from 'react-notifications';
import { useAppSettings } from 'hooks/useAppSettings';
import './notification.css';

const GlobalTemplate = ({ children }) => {
  const pageInitSettings = {
    appTheme: 'chocolate',
    navPosition: 'menu-top',
    sidebarTheme: 'dark',
    lang: 'pl',
  };

  const {
    isMobile,
    appTheme,
    navPosition,
    sidebarTheme,
    remeberSettings,
    lang,
    isAdminPage,
    navPositionHandler,
    appThemeHandler,
    sidebarThemeHandler,
    remeberSettingsHandler,
    langSwitchHandler,
  } = useAppSettings(pageInitSettings);

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
        remeberSettings,
        lang,
        isAdminPage,
        appThemeHandler,
        sidebarThemeHandler,
        navPositionHandler,
        langSwitchHandler,
        remeberSettingsHandler,
      }}
    >
      <GlobalStyle />
      <NotificationContainer leaveTimeout={100} />
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

// TODO create hook for page context
