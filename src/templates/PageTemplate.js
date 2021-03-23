import React, { useContext } from 'react';
import PageContext from 'context';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
// import SettingsPanel from 'components/organism/SettingsPanel/SettingsPanel';
import Button from 'components/atoms/Button/Button';
import Backdrop from 'components/atoms/Backdrop/Backdrop';
import Navigation from 'components/organism/Navigation/Navigation';
import { langPl, langEN } from 'languages/language';

const StyledAppWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  background-image: url(${({ theme }) => theme.backgrounImage});
  color: ${({ theme }) => theme.color};
  min-height: 100vh;
  display: grid;

  &.sidebar {
    grid-auto-flow: column;
  }

  &.menu-top {
    grid-auto-flow: row;
  }
`;

const StyleLangSwitchWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 60px;
`;

const ShowMenuButton = styled(Button)`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const PageTemplate = (props) => {
  const appContext = useContext(PageContext);
  const {
    lang, langSwitchHandler, navPosition, isMobile, sidebarTheme,
  } = appContext;

  const appClasses = isMobile ? ['sidebar-mobile', 'hidden'] : [navPosition, sidebarTheme];

  const language = lang === 'pl' ? { ...langPl } : { ...langEN };

  console.log(language);

  return (
    <StyledAppWrapper className={appClasses}>
      <StyleLangSwitchWrapper>
        <InlineSwitcher
          isChecked={lang === 'en'}
          switchColor="secondary"
          notCheckedColor="tertiary"
          change={langSwitchHandler}
          labelBefore="🇵🇱"
          labelAfter="🇬🇧"
          labelBeforeStyle={{ fontSize: '20px' }}
          labelAfterStyle={{ fontSize: '20px' }}
        />
      </StyleLangSwitchWrapper>
      {isMobile && (
        <div>
          <ShowMenuButton btnSmall btnType="primary">
            Show
          </ShowMenuButton>
        </div>
      )}
      {isMobile && <Backdrop />}
      <Navigation classes={appClasses} langMenu={language.menu} />
      <>{props.children}</>
    </StyledAppWrapper>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};
export default PageTemplate;
