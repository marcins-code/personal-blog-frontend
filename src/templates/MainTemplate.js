import React, { useContext, useState } from 'react';
import { PageContext } from 'context';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SettingsPanel from 'components/organism/SettingsPanel/SettingsPanel';
import Navigation from 'components/organism/Navigation/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from 'components/atoms/Backdrop/Backdrop';
import Sidebar from 'components/molecules/Sidebar/Sidebar';
import { CSSTransition } from 'react-transition-group';
import 'templates/aminations.css';
import MobileNav from 'components/molecules/MobileNav/MobileNav';

const StyledGlobalWrapper = styled.div`
  width: 100%;
  position: absolute;
  overflow-x: visible;
  background-attachment: fixed;
  box-shadow: 0 0 250px black inset;
  background-color: ${({ theme }) => theme.backgroundsBody.backgroundColor};
  background-image: url(${({ theme }) => theme.backgroundsBody.backgrounImage});
`;

const StyledAppWrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundsApp.backgroundColor};
  background-attachment: fixed;
  background-image: url(${({ theme }) => theme.backgroundsApp.backgrounImage});
  color: ${({ theme }) => theme.color};
  min-height: 100vh;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  position: relative;
  /* z-index: 1; */
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 0 430px 10px ${({ theme }) => theme.backgroundsApp.boxShadowColor} inset,
    0px 0 430px 40px rgba(0, 0, 0, 0.5);

  &.sidebar > .content-wrapper {
    margin-left: 230px;
    transition: margin 800ms;
    transition-delay: 320ms;
  }

  &.menu-top > .content-wrapper {
  }
  @media (max-width: 768px) {
    width: 100%;
    /* padding: 10px 20px; */
    box-shadow: none;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    width: 93%;
    /* padding: 10px 20px; */
    box-shadow: none;
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
  padding: 10px 50px;
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
  @media (max-width: 768px) {
    padding: 20px 40px;
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
      <SettingsPanel />
      <StyledGlobalWrapper className="global-wrapper">
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
      </StyledGlobalWrapper>
    </>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PageTemplate;
