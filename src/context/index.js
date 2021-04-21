import React from 'react';

export const PageContext = React.createContext({
  appTheme: 'dark',
  navPosition: 'menu-top',
  lang: 'pl',
  remeberSettings: false,
  isMobile: false,
  isAdminPage: false,
  appThemeHandler: () => {},
  navPositionHandler: () => {},
  remeberSettingsHandler: () => {},
  langSwitchHandler: () => {},
});

export const AuthContext = React.createContext({
  isLoggedIn: false,
  userId: null,
  firstName: null,
  lastName: null,
  roles: null,
  token: null,
  login: () => {},
  logout: () => {},
});
