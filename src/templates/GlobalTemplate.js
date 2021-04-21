import React from 'react';
import { PageContext } from 'context';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import PropTypes from 'prop-types';
import { ThemeMixer } from 'themes/ThemeMixer';
import { useAppSettings } from 'hooks/useAppSettings';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastsContainer } from 'components/atoms/Toast/Toast';
import { cssTransition } from 'react-toastify';
import 'assets/css/animations.css';

const GlobalTemplate = ({ children }) => {
  const toastsAnimations = cssTransition({
    enter: 'tilt-in-fwd-tr',
    exit: 'flip-out-ver-left',
  });

  const pageInitSettings = {
    appTheme: 'dark',
    navPosition: 'menu-top',
    sidebarTheme: 'dark',
    lang: 'pl',
  };

  const {
    isMobile,
    appTheme,
    lang,
    remeberSettings,
    navPosition,
    isAdminPage,
    appThemeHandler,
    navPositionHandler,
    remeberSettingsHandler,
    langSwitchHandler,
  } = useAppSettings(pageInitSettings);

  const theme = ThemeMixer(appTheme, pageInitSettings);

  return (
    <PageContext.Provider
      value={{
        isMobile,
        appTheme,
        lang,
        remeberSettings,
        navPosition,
        isAdminPage,
        appThemeHandler,
        navPositionHandler,
        remeberSettingsHandler,
        langSwitchHandler,
      }}
    >
      <GlobalStyle />
      <StyledToastsContainer transition={toastsAnimations} />
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
