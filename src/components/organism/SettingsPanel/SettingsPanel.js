import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import PageContext from 'context';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import { darkTheme, lightTheme, chocolateTheme } from 'themes/Theme';

const StyledPanelWrapper = styled.div`
  display: block;
  position: fixed;
  z-index: 50000;
  width: 250px;
  top: 120px;
  right: 0;
  /* background-color: #1D1D1D; */
  background-color: #3b3b3b;
  background-image: linear-gradient(
      to bottom,
      rgba(10, 10, 10, 0.6) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(10, 10, 10, 0.8) 100%
    ),
    url('https://www.transparenttextures.com/patterns/cardboard-flat.png');
  color: ${({ theme }) => theme.grey200};
  box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.5), -1px 0 3px rgba(0, 0, 0, 0.4),
    -1px 0 2px 2px rgba(0, 0, 0, 0.5) inset;
  border-radius: 20px 0 0 20px;
  padding: 20px;
  justify-items: center;
  justify-content: center;
  text-align: center;
  > p,
  span {
    color: ${({ theme }) => theme.grey200};
  }
`;

const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 30px;
`;

const StyledSettingButton = css`
  width: 30px;
  height: 30px;
  border: solid 1px transparent;
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

const StyledDarkButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(${darkTheme.background}, ${darkTheme.backgroundDarken});
  border-color: ${darkTheme.backgroundDarken};
`;

const StyledLightButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(${lightTheme.background}, ${lightTheme.backgroundDarken});
  border-color: ${lightTheme.backgroundDarken};
`;

const StyledChocolateButton = styled.button`
  ${StyledSettingButton};
  background: linear-gradient(${chocolateTheme.background}, ${chocolateTheme.backgroundDarken});
  border-color: ${chocolateTheme.backgroundDarken};
`;

const SettingsPanel = () => {
  const appContext = useContext(PageContext);
  const {
    appTheme,
    // sidebarTheme,
    navPosition,
    appThemeHandler,
    // sidebarThemeHandler,
    navPositionHandler,
  } = appContext;

  return (
    <>
      <StyledPanelWrapper>
        <p>choose color</p>
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
        <p>choose laout</p>
        <StyledSectionWrapper>
          <InlineSwitcher
            isChecked={navPosition === 'sidebar'}
            switchColor="secondary"
            notCheckedColor="tertiary"
            change={navPositionHandler}
            labelBefore="Top Menu"
            labelAfter="Sidebar"
            labelBeforeStyle={{ fontSize: '1.2rem' }}
            labelAfterStyle={{ fontSize: '1.2rem' }}
          />
        </StyledSectionWrapper>
        {navPosition === 'sidebar' && (
          <>
            <p>choose color</p>
            <StyledSectionWrapper>
              {/* <Button
                btnSwitch
                btnColor="dark"
                value="dark"
                clicked={sidebarThemeHandler}
                classess={sidebarTheme === 'dark' ? 'active' : null}
              />
              <Button
                btnSwitch
                btnColor="light"
                value="light"
                clicked={sidebarThemeHandler}
                classess={sidebarTheme === 'light' ? 'active' : null}
              />
              <Button
                btnSwitch
                btnColor="chocolade"
                value="chocolade"
                clicked={sidebarThemeHandler}
                classess={sidebarTheme === 'chocolade' ? 'active' : null}
              />
              <Button
                btnSwitch
                btnColor="secondary"
                value="blue"
                clicked={sidebarThemeHandler}
                classess={sidebarTheme === 'blue' ? 'active' : null}
              /> */}
            </StyledSectionWrapper>
          </>
        )}
      </StyledPanelWrapper>
    </>
  );
};

export default SettingsPanel;
