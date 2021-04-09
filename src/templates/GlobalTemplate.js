import React from 'react';
import { PageContext } from 'context';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import PropTypes from 'prop-types';
import { ThemeMixer } from 'themes/ThemeMixer';
import { NotificationContainer } from 'react-notifications';
import { useAppSettings } from 'hooks/useAppSettings';
import './notification.css';

const GlobalTemplate = ({ children }) => {
  const pageInitSettings = {
    appTheme: 'dark',
    navPosition: 'sidebar',
    sidebarTheme: 'dark',
    lang: 'pl',
  };

  const {
    isMobile,
    appTheme,
    navPosition,
    remeberSettings,
    lang,
    isAdminPage,
    navPositionHandler,
    appThemeHandler,
    sidebarThemeHandler,
    remeberSettingsHandler,
    langSwitchHandler,
  } = useAppSettings(pageInitSettings);

  const theme = ThemeMixer(appTheme, pageInitSettings);

  return (
    <PageContext.Provider
      value={{
        isMobile,
        appTheme,
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
