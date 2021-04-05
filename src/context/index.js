import React from 'react';

export const PageContext = React.createContext({
  isMobile: false,
  lang: 'pl',
  appTheme: 'chocolate',
  sidebarTheme: 'chocolate',
  remeberSettings: false,
  navPosition: 'menu - top',
  isAdminPage: false,
  appThemeHandler: () => {},
  sidebarThemeHandler: () => {},
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
