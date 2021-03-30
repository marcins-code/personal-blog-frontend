import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import PageContext from 'context';
import TopMenu from 'components/molecules/TopMenu/TopMenu';
import Sidebar from 'components/molecules/Sidebar/Sidebar';
import './animations.css';

const Navigation = () => {
  const appContext = useContext(PageContext);
  const {
    navPosition, prevNavPosition, isAdminPage, isMobile, appTheme,
  } = appContext;

  const navClass = isAdminPage ? 'sidebar' : navPosition;
  const appClasses = isMobile ? ['sidebar-mobile', 'hidden'] : [navClass, appTheme];
  return (
    <>
      <CSSTransition
        in={
          navPosition !== 'sidebar' || (prevNavPosition === 'sidebar' && navPosition === 'menu-top')
        }
        timeout={2500}
        classNames="menutop"
        unmountOnExit
      >
        <TopMenu classes={appClasses} />
      </CSSTransition>
      <CSSTransition
        in={
          navPosition !== 'menu-top'
          || (prevNavPosition === 'menu-top' && navPosition === 'sidebar')
        }
        timeout={2500}
        classNames="sidebar"
        unmountOnExit
      >
        <Sidebar classes={appClasses} />
      </CSSTransition>
    </>
  );
};

export default Navigation;
