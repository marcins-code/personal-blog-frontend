import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import PageContext from 'context';

const StyleLangSwitchWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 60px;
`;

const LangSwitcher = () => {
  const appContext = useContext(PageContext);
  const { langSwitchHandler, lang } = appContext;

  const langSwitcher = (
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
  );
  return ReactDOM.createPortal(langSwitcher, document.getElementById('tools-hook'));
};

export default LangSwitcher;
