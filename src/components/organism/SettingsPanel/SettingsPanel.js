import React, { useContext } from 'react';
import styled from 'styled-components';
import PageContext from 'context';
import Button from 'components/atoms/Button/Button';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';

const StyledPanelWrapper = styled.div`
  display: block;
  position: fixed;
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
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const SettingsPanel = () => {
  const contextData = useContext(PageContext);
  const {
    theme,
    toggleTheme,
    toggleNav,
    menuStyle,
    toggleSidebarTheme,
    sidebarTheme,
  } = contextData;

  console.log(contextData);

  return (
    <>
      <StyledPanelWrapper>
        <p>choose color</p>
        <StyledSectionWrapper>
          <Button
            btnSwitch
            btnColor="dark"
            value="dark"
            clicked={toggleTheme}
            classess={theme === 'dark' ? 'active' : null}
          />
          <Button
            btnSwitch
            btnColor="light"
            value="light"
            clicked={toggleTheme}
            classess={theme === 'light' ? 'active' : null}
          />
          <Button
            btnSwitch
            btnColor="chocolade"
            value="chocolade"
            clicked={toggleTheme}
            classess={theme === 'chocolade' ? 'active' : null}
          />
        </StyledSectionWrapper>
        <p>choose laout</p>
        <StyledSectionWrapper>
          <InlineSwitcher
            isChecked={menuStyle === 'sidebar'}
            switchColor="secondary"
            notCheckedColor="tertiary"
            change={toggleNav}
            labelBefore="Top Menu"
            labelAfter="Sidebar"
            labelBeforeStyle={{ fontSize: '1.2rem' }}
            labelAfterStyle={{ fontSize: '1.2rem' }}
          />
        </StyledSectionWrapper>
        {menuStyle === 'sidebar' && (
          <>
            <p>choose color</p>
            <StyledSectionWrapper>
              <Button
                btnSwitch
                btnColor="dark"
                value="dark"
                clicked={toggleSidebarTheme}
                classess={sidebarTheme === 'dark' ? 'active' : null}
              />
              <Button
                btnSwitch
                btnColor="light"
                value="light"
                clicked={toggleSidebarTheme}
                classess={sidebarTheme === 'light' ? 'active' : null}
              />
              <Button
                btnSwitch
                btnColor="chocolade"
                value="chocolade"
                clicked={toggleSidebarTheme}
                classess={sidebarTheme === 'chocolade' ? 'active' : null}
              />
              <Button
                btnSwitch
                btnColor="secondary"
                value="blue"
                clicked={toggleSidebarTheme}
                classess={sidebarTheme === 'blue' ? 'active' : null}
              />
            </StyledSectionWrapper>
          </>
        )}
      </StyledPanelWrapper>
    </>
  );
};

export default SettingsPanel;
