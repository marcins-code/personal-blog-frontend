import { useState, useEffect, useCallback } from 'react';
import useWindowSize from 'hooks/useWindowSize';
import { useLocation } from 'react-router-dom';

export const useAppSettings = (pageInitSettings) => {
  const storedValues = JSON.parse(localStorage.getItem('appSettings'));
  const [appTheme, setAppTheme] = useState(
    storedValues ? storedValues.appTheme : pageInitSettings.appTheme,
  );
  const [navPosition, setNavPosition] = useState(
    storedValues ? storedValues.navPosition : pageInitSettings.navPosition,
  );
  const [lang, setLang] = useState(storedValues ? storedValues.lang : pageInitSettings.lang);
  const [remeberSettings, setRemeberSettings] = useState(!!storedValues);

  useEffect(() => {
    if (remeberSettings) {
      localStorage.setItem(
        'appSettings',
        JSON.stringify({
          appTheme,
          navPosition,
          lang,
        }),
      );
    } else {
      localStorage.removeItem('appSettings');
    }
  }, [remeberSettings]);

  useEffect(() => {
    if (remeberSettings) {
      localStorage.removeItem('appSettings');
      localStorage.setItem(
        'appSettings',
        JSON.stringify({
          appTheme,
          navPosition,
          lang,
        }),
      );
    }
  }, [appTheme, navPosition, lang]);

  const [isMobile, setIsMobile] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const regex = /^\/admin/g;
    const found = location.pathname.match(regex);
    setIsAdminPage(Boolean(found));
  }, [location]);
  const size = useWindowSize();
  useEffect(() => {
    setIsMobile(size.width <= 768);
  }, [size]);

  const appThemeHandler = useCallback(
    (e) => {
      setAppTheme(e.target.dataset.apptheme);
    },
    [appTheme],
  );

  const navPositionHandler = useCallback(
    (e) => {
      setNavPosition(e.target.checked ? 'sidebar' : 'menu-top');
    },
    [navPosition],
  );

  const langSwitchHandler = useCallback(
    (e) => {
      setLang(e.target.checked ? 'en' : 'pl');
    },
    [lang],
  );

  const remeberSettingsHandler = useCallback(
    (e) => {
      setRemeberSettings(e.target.checked);
    },
    [remeberSettings],
  );

  return {
    isMobile,
    appTheme,
    navPosition,
    remeberSettings,
    lang,
    isAdminPage,
    navPositionHandler,
    appThemeHandler,
    remeberSettingsHandler,
    langSwitchHandler,
  };
};
