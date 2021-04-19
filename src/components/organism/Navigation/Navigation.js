import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { PageContext } from 'context';
import TopMenu from 'components/molecules/TopMenu/TopMenu';
import Sidebar from 'components/molecules/Sidebar/Sidebar';
import Backdrop from 'components/atoms/Backdrop/Backdrop';
import MobileNav from 'components/molecules/MobileNav/MobileNav';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'assets/css/animations.css';

const ShowMenuButton = styled.button`
  position: fixed;
  height: 35px;
  width: 35px;
  top: 10px;
  z-index: 305;
  left: 10px;
  padding: 3px;
  border-radius: 7px !important;
  background-color: ${({ theme }) => (theme.themeName !== 'light' ? theme.grey300 : theme.grey700)};
  color: ${({ theme }) => (theme.themeName !== 'light' ? theme.grey800 : theme.grey200)};
  box-shadow: 0 3px 12px -7px rgba(0, 0, 0, 0.9);
  border: none;
  &:focus,
  :active {
    outline: none;
  }
`;

const Navigation = () => {
  const appContext = useContext(PageContext);
  const { isMobile } = appContext;
  const [showMobileNav, setShowMobileNav] = useState(false);
  return !isMobile ? (
    <>
      <TopMenu />
      <Sidebar />
    </>
  ) : (
    <>
      <ShowMenuButton onClick={() => setShowMobileNav(true)}>
        <FontAwesomeIcon icon={['fas', 'bars']} size="2x" />
      </ShowMenuButton>
      <Backdrop onClick={() => setShowMobileNav(false)} bckdShow={showMobileNav} />
      <CSSTransition
        in={showMobileNav}
        mountOnEnter
        unmountOnExit
        timeout={700}
        classNames={{ enter: 'slide-in-left', exit: 'slide-out-left' }}
      >
        <MobileNav />
      </CSSTransition>
    </>
  );
};

export default Navigation;
