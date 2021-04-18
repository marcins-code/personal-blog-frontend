import React, { useContext } from 'react';
import styled from 'styled-components';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import { PageContext } from 'context';

const StyleLangSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;

const LangSwitcher = () => {
  const appContext = useContext(PageContext);
  const { langSwitchHandler, lang } = appContext;

  return (
    <StyleLangSwitchWrapper>
      <InlineSwitcher
        switchName="langSwitch"
        isChecked={lang === 'en'}
        switchColor="indygo"
        notCheckedColor="blue"
        change={langSwitchHandler}
        labelBefore="🇵🇱"
        labelAfter="🇬🇧"
        labelBeforeStyle={{ fontSize: '20px' }}
        labelAfterStyle={{ fontSize: '20px' }}
      />
    </StyleLangSwitchWrapper>
  );
};

export default LangSwitcher;
