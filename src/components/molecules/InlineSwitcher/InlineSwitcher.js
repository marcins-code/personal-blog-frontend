import React from 'react';
import propTypes from 'prop-types';
import Switcher from 'components/atoms/Switcher/Switcher';
import styled from 'styled-components';

const StyledLangWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InlineSwitcher = ({
  isChecked,
  switchColor,
  notCheckedColor,
  change,
  labelBefore,
  labelAfter,
  labelBeforeStyle,
  labelAfterStyle,
}) => (
  <StyledLangWrapper>
    <span style={labelBeforeStyle}>{labelBefore}</span>
    <Switcher
      isChecked={isChecked}
      switchColor={switchColor}
      notCheckedColor={notCheckedColor}
      type="checkbox"
      change={change}
    />
    <span style={labelAfterStyle}>{labelAfter}</span>
  </StyledLangWrapper>
);

InlineSwitcher.propTypes = {
  isChecked: propTypes.bool,
  switchColor: propTypes.string.isRequired,
  notCheckedColor: propTypes.string,
  change: propTypes.func.isRequired,
  labelBefore: propTypes.string,
  labelAfter: propTypes.string,
  labelBeforeStyle: propTypes.instanceOf(Object),
  labelAfterStyle: propTypes.instanceOf(Object),
};

InlineSwitcher.defaultProps = {
  isChecked: false,
  notCheckedColor: 'dark',
  labelBefore: null,
  labelAfter: null,
  labelBeforeStyle: null,
  labelAfterStyle: null,
};

export default InlineSwitcher;
