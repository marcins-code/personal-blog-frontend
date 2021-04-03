import { useCallback, useState, useEffect } from 'react';

export const useAuth = () => {
  let logoutTimer;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserID] = useState();
  const [userRoles, setUserRoles] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [token, setToken] = useState();
  const [tokenExpiration, setTokenExpiration] = useState();

  const login = useCallback(
    (logged, resUserId, roles, firstName, lastName, ResToken, ResTokenExpiration) => {
      setIsLoggedIn(logged);
      setUserID(resUserId);
      setUserRoles(roles);
      setUserFirstName(firstName);
      setUserLastName(lastName);
      setToken(ResToken);
      setTokenExpiration(ResTokenExpiration);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          token: ResToken,
          UserId: resUserId,
          roles,
          firstName,
          lastName,
          tokenExpiration: ResTokenExpiration,
        }),
      );
    },
    [],
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserID();
    setUserRoles();
    setUserFirstName();
    setUserLastName();
    setToken();
    setTokenExpiration();
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      logoutTimer = Date.parse(tokenExpiration) - new Date().getTime();
      setTimeout(logout, logoutTimer);
    }
    return clearTimeout(logoutTimer);
  }, [token, logout, tokenExpiration]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData && storedUserData.token) {
      login(
        true,
        storedUserData.UserId,
        storedUserData.roles,
        storedUserData.firstName,
        storedUserData.lastName,
        storedUserData.token,
        storedUserData.tokenExpiration,
      );
    }
  }, [login]);

  return {
    isLoggedIn,
    userId,
    userRoles,
    userFirstName,
    userLastName,
    token,
    tokenExpiration,
    login,
    logout,
  };
};
