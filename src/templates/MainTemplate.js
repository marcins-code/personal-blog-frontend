import React, { useContext } from 'react';
import { PageContext } from 'context';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SettingsPanel from 'components/organism/SettingsPanel/SettingsPanel';
import Navigation from 'components/organism/Navigation/Navigation';
import { CSSTransition } from 'react-transition-group';
import 'templates/aminations.css';
import { device } from 'themes/commonElements/mediaBreakpoints';
import './aminations.css';

const StyledBodyWrapper = styled.div`
  width: 100%;
  position: absolute;
  background-attachment: fixed;
  background-color: ${({ theme }) => theme.globalBackgroundColor};
  background-image: url(${({ theme }) => theme.globalBackgrounImage});
  min-height: 100vh;
`;

const StyledAppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;

  @media ${device.max.tablet} {
    width: 100%;
  }

  @media ${device.min.tablet} {
    width: 95%;
  }

  @media ${device.min.laptop} {
    width: 85%;
  }

  @media ${device.min.laptopL} {
    width: 75%;
  }
`;

const StyledContentWrapper = styled.div`
  background-image: url(${({ theme }) => theme.appBackgrounImage});
  background-color: ${({ theme }) => theme.appBackgroundColor};
  background-attachment: fixed;
  box-shadow: 0 0 100px -20px ${({ theme }) => theme.appBoxShadowColor} inset, 0 0 10px 2px black;
  overflow: hidden;
  position: relative;

  z-index: 300;

  &.menu-top {
    min-height: calc(100vh - 80px);
  }

  &.sidebar-mobile {
    min-height: 100vh;
    transition: none;
  }

  &.sidebar {
    min-height: 100vh;
    @media ${device.min.tablet} {
      margin-left: 170px !important;
    }

    @media ${device.min.laptop} {
      margin-left: 190px !important;
    }

    transition: margin 800ms ease-in-out;
    transition-delay: 350ms;
  }
`;

const StyledContent = styled.div`
  color: ${({ theme }) => theme.color};
  margin-left: 0px;
  padding: 10px 50px;

  @media ${device.max.tablet} {
    padding-top: 50px;
  }

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

const PageTemplate = ({ children }) => {
  const appContext = useContext(PageContext);

  const { navPosition, isMobile, appTheme } = appContext;
  const appClasses = isMobile ? 'sidebar-mobile' : `${navPosition} ${appTheme}`;

  return (
    <>
      <SettingsPanel />
      <StyledBodyWrapper className="global-wrapper">
        <StyledAppWrapper className={[appClasses, 'app-wrapper']}>
          <Navigation />
          <CSSTransition
            in={navPosition === 'sidebar' && !isMobile}
            timeout={2000}
            classNames="content"
          >
            <StyledContentWrapper className={[appClasses]}>
              <StyledContent>{children}</StyledContent>
            </StyledContentWrapper>
          </CSSTransition>
        </StyledAppWrapper>
      </StyledBodyWrapper>
    </>
  );
};
PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PageTemplate;
