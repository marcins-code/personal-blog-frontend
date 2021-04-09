import React from 'react';
import PropTypes from 'prop-types';
import Switcher from 'components/atoms/Switcher/Switcher';
import styled from 'styled-components';
import FormikLabel from '../FormikLabel/FormikLabel';

const StyledSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledWrapper = styled.div`
  display: block;
`;

const InlineSwitcher = ({
  switchName,
  isChecked,
  switchColor,
  notCheckedColor,
  change,
  labelBefore,
  labelAfter,
  labelBeforeStyle,
  labelAfterStyle,
  label,
}) => (
  <StyledWrapper>
    {label && <FormikLabel label={label} labelFor={switchName} />}
    <StyledSwitchWrapper>
      <span style={labelBeforeStyle}>{labelBefore}</span>
      <Switcher
        name={switchName}
        isChecked={isChecked}
        switchColor={switchColor}
        notCheckedColor={notCheckedColor}
        type="checkbox"
        change={change}
      />
      <span style={labelAfterStyle}>{labelAfter}</span>
    </StyledSwitchWrapper>
  </StyledWrapper>
);

InlineSwitcher.propTypes = {
  switchName: PropTypes.string,
  isChecked: PropTypes.bool,
  switchColor: PropTypes.string.isRequired,
  notCheckedColor: PropTypes.string,
  change: PropTypes.func.isRequired,
  labelBefore: PropTypes.string,
  labelAfter: PropTypes.string,
  labelBeforeStyle: PropTypes.instanceOf(Object),
  labelAfterStyle: PropTypes.instanceOf(Object),
  label: PropTypes.string,
};

InlineSwitcher.defaultProps = {
  switchName: undefined,
  isChecked: false,
  notCheckedColor: 'dark',
  labelBefore: null,
  labelAfter: null,
  labelBeforeStyle: null,
  labelAfterStyle: null,
  label: '',
};

export default InlineSwitcher;
