import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { PageContext } from 'context';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import { settingsPanelItems } from 'languages/menus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import LangSwitcher from 'components/organism/LangSwitcher/LangSwitcher';

import './animation.css';

const StyledPanelWrapper = styled.div`
  display: block;
  position: fixed;
  z-index: 50000;
  width: 270px;
  top: 50px;
  right: 0;
  margin-right: -5px;
  background-color: #3b3b3b;
  background-image: linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.6) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(10, 10, 10, 0.8) 100%
    ),
    url('https://www.transparenttextures.com/patterns/cardboard-flat.png');
  box-shadow: -5px 10px 40px -15px rgba(0, 0, 0, 0.5), 0 0 145px rgba(0, 0, 0, 0.65) inset;
  border-radius: 25px 0 0 25px;
  justify-items: center;
  justify-content: center;
  text-align: center;
  border: solid #6d6d6d 2px;

  @media (max-height: 575px) {
    position: absolute;
  }
`;

const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 60px;
`;

const StyledSettingButton = css`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: ridge 2px #a2a2a2;
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  position: relative;
  &:focus,
  :active {
    outline: none;
  }
  &.active {
    &::before {
      content: '✔︎';
      color: #29b64f;
      text-shadow: 0 1px 1px black;
    }
  }
`;

const StyledDivider = styled.hr`
  border-color: #585858;
  border-style: inset;
  border-width: 1px;
  margin: 0 5px;
`;

const StyledLabel = styled.p`
  font-size: 1.6rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  margin-top: 10px;
  color: ${({ theme }) => theme.grey200};
`;

const StyledDarkButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(${({ theme }) => theme.dark}, ${({ theme }) => theme.darkDarken});
`;

const StyledLightButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(${({ theme }) => theme.light}, ${({ theme }) => theme.lightDark});
`;

const StyledChocolateButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(
    ${({ theme }) => theme.chocolate},
    ${({ theme }) => theme.chocolateDark}
  );
`;
const StyledBlueButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(${({ theme }) => theme.blue}, ${({ theme }) => theme.blueDark});
`;

const StyledCloseButton = styled(FontAwesomeIcon)`
  font-size: 2rem;
  color: #377289;
  cursor: pointer;
  position: absolute;
  left: 10px;
  top: 10px;
  &:hover {
    color: #b23b00;
    transition: color 400ms ease;
  }
`;

const StyledToggleButton = styled.button`
  position: fixed;
  height: 45px;
  z-index: 3000;
  cursor: pointer;
  right: -5px;
  top: 10px;
  color: ${({ theme }) => theme.grey200};
  text-shadow: 2px 2px 2px black;
  padding: 5px 20px;
  border: none;
  border-radius: 30px 0 0 30px;
  background: linear-gradient(#4d82e5, #003148);
  box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.5), 0 0 40px 20px rgba(0, 0, 0, 0.3) inset;
  font-size: 1.6rem;
  border: solid #002435 2px;
  &:active,
  :focus {
    outline: none;
  }
`;

const SettingsPanel = () => {
  const [isPanelVisible, setIsPanleVisible] = useState(false);

  const panelShowHandler = () => setIsPanleVisible(true);
  const panelHideHandler = () => setIsPanleVisible(false);

  const appContext = useContext(PageContext);
  const {
    isMobile,
    appTheme,
    isAdminPage,
    sidebarTheme,
    navPosition,
    remeberSettings,
    appThemeHandler,
    sidebarThemeHandler,
    navPositionHandler,
    remeberSettingsHandler,
    lang,
  } = appContext;

  const phrazes = lang === 'pl' ? settingsPanelItems.pl : settingsPanelItems.en;

  const panel = (
    <>
      <CSSTransition in={isPanelVisible} classNames="panel" timeout={1000} unmountOnExit>
        <StyledPanelWrapper className={[navPosition, isPanelVisible ? 'visible' : '']}>
          <StyledCloseButton
            icon={['far', 'times-circle']}
            style={{ float: 'left' }}
            onClick={panelHideHandler}
          />
          <StyledLabel>{phrazes.chooseLang}</StyledLabel>
          <StyledSectionWrapper style={{ justifyContent: 'center' }}>
            <LangSwitcher />
          </StyledSectionWrapper>
          <StyledDivider />
          <StyledLabel>{phrazes.chooseTheme}</StyledLabel>
          <StyledSectionWrapper>
            <StyledDarkButton
              data-apptheme="dark"
              onClick={appThemeHandler}
              className={appTheme === 'dark' && 'active'}
            />
            <StyledLightButton
              data-apptheme="light"
              onClick={appThemeHandler}
              className={appTheme === 'light' && 'active'}
            />
            <StyledChocolateButton
              data-apptheme="chocolate"
              onClick={appThemeHandler}
              className={appTheme === 'chocolate' && 'active'}
            />
          </StyledSectionWrapper>
          {!isAdminPage && !isMobile && (
            <>
              <StyledDivider />
              <StyledLabel>{phrazes.chooseLayout}</StyledLabel>
              <StyledSectionWrapper>
                <InlineSwitcher
                  isChecked={navPosition === 'sidebar'}
                  switchColor="success"
                  notCheckedColor="info"
                  change={navPositionHandler}
                  labelBefore="Top Menu"
                  labelAfter="Sidebar"
                  labelBeforeStyle={{ fontSize: '1.2rem', color: '#fafafa' }}
                  labelAfterStyle={{ fontSize: '1.2rem', color: '#fafafa' }}
                />
              </StyledSectionWrapper>
            </>
          )}

          {(navPosition === 'sidebar' || isAdminPage) && !isMobile && (
            <>
              <StyledDivider />
              <StyledLabel>{phrazes.chooseSidebarTheme}</StyledLabel>
              <StyledSectionWrapper className={navPosition}>
                <StyledDarkButton
                  data-sidebartheme="dark"
                  onClick={sidebarThemeHandler}
                  className={sidebarTheme === 'dark' && 'active'}
                />
                <StyledLightButton
                  data-sidebartheme="light"
                  onClick={sidebarThemeHandler}
                  className={sidebarTheme === 'light' && 'active'}
                />
                <StyledChocolateButton
                  data-sidebartheme="chocolate"
                  onClick={sidebarThemeHandler}
                  className={sidebarTheme === 'chocolate' && 'active'}
                />
                <StyledBlueButton
                  data-sidebartheme="blue"
                  onClick={sidebarThemeHandler}
                  className={sidebarTheme === 'blue' && 'active'}
                />
              </StyledSectionWrapper>
            </>
          )}
          <StyledDivider />
          <StyledLabel>{phrazes.remeberSettings}</StyledLabel>
          <StyledSectionWrapper style={{ justifyContent: 'center' }}>
            <InlineSwitcher
              isChecked={remeberSettings}
              switchColor="success"
              change={remeberSettingsHandler}
            />
          </StyledSectionWrapper>
        </StyledPanelWrapper>
      </CSSTransition>
      <CSSTransition in={!isPanelVisible} timeout={1000} classNames="toggle-button" unmountOnExit>
        <StyledToggleButton label="show" type="button" onClick={panelShowHandler}>
          <FontAwesomeIcon icon={['fas', 'cogs']} />
        </StyledToggleButton>
      </CSSTransition>
    </>
  );

  return ReactDOM.createPortal(panel, document.getElementById('tools-hook'));
};

export default SettingsPanel;
