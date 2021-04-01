import React, { useContext, useState } from 'react';
import { PageContext } from 'context';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SettingsPanel from 'components/organism/SettingsPanel/SettingsPanel';
import LangSwitcher from 'components/organism/LangSwitcher/LangSwitcher';
import Navigation from 'components/organism/Navigation/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from 'components/atoms/Backdrop/Backdrop';
import Sidebar from 'components/molecules/Sidebar/Sidebar';
import { CSSTransition } from 'react-transition-group';
import 'templates/aminations.css';
import MobileNav from 'components/molecules/MobileNav/MobileNav';

const StyledAppWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  background-attachment: fixed;
  background-image: url(${({ theme }) => theme.backgrounImage});
  color: ${({ theme }) => theme.color};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;

  &.sidebar > .content-wrapper {
    margin-left: 270px;
    transition: margin 800ms;
    transition-delay: 320ms;
  }
`;

const ShowMenuButton = styled.button`
  position: absolute;
  height: 35px;
  width: 35px;
  top: 10px;
  left: 10px;
  border-radius: 7px !important;
  background: linear-gradient(
    to top,
    #642b73,
    #c6426e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: ${({ theme }) => theme.grey200};
  box-shadow: 0 3px 12px -7px rgba(0, 0, 0, 0.9);
  border: none;
  &:focus,
  :active {
    outline: none;
  }
`;

const StyledContentWrapper = styled.div`
  padding: 20px 80px;
  opacity: 1;
  animation: fadein 800ms;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const PageTemplate = (props) => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const showMobileNavHandler = () => {
    setShowMobileNav(true);
  };
  const hideMobileNavHandler = () => {
    setShowMobileNav(false);
  };

  const appContext = useContext(PageContext);

  const {
    navPosition, prevNavPosition, isMobile, appTheme, isAdminPage,
  } = appContext;

  const navClass = isAdminPage ? 'sidebar' : navPosition;

  const appClasses = isMobile ? ['sidebar-mobile'] : [navClass, appTheme];

  return (
    <>
      <LangSwitcher />
      <SettingsPanel />
      <StyledAppWrapper className={appClasses} id="app-wrapper">
        {isMobile && (
          <>
            <ShowMenuButton onClick={showMobileNavHandler}>
              <FontAwesomeIcon icon={['fas', 'bars']} />
            </ShowMenuButton>
            {showMobileNav && <Backdrop onClick={hideMobileNavHandler} />}
            <MobileNav isShown={showMobileNav} />
            <StyledContentWrapper className="content-wrapper">
              <>{props.children}</>
            </StyledContentWrapper>
          </>
        )}

        {!isAdminPage && !isMobile && (
          <>
            <Navigation />
            <CSSTransition
              in={
                navPosition !== 'menu-top'
                || (prevNavPosition === 'menu-top' && navPosition === 'sidebar')
              }
              timeout={2000}
              classNames="content"
            >
              <StyledContentWrapper className="content-wrapper">
                <>{props.children}</>
              </StyledContentWrapper>
            </CSSTransition>
          </>
        )}
        {isAdminPage && !isMobile && (
          <>
            <Sidebar classes={appClasses} />
            <StyledContentWrapper className="content-wrapper">
              <>{props.children}</>
            </StyledContentWrapper>
          </>
        )}
      </StyledAppWrapper>
    </>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PageTemplate;
