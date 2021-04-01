import React from 'react';

export const PageContext = React.createContext();

export const AuthContext = React.createContext({
  isLoggedIn: false,
  firstName: null,
  lastName: null,
  roles: null,
  token: null,
  login: () => {},
  logout: () => {},
});
