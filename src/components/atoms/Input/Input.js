import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { commonTheme, darkTheme } from 'themes/Theme';

const theme = { ...commonTheme, ...darkTheme };

const StyledInput = styled.input`
  height: 30px;
  width: 100%;
  font-size: 1.6rem;
  padding: 0 10px;
  background-color: ${theme.light.backgroundColor};
  border-radius: 10px;
  border: solid 2px ${theme.light.backgroundDarken};

  &:focus,
  :active {
    border-color: ${theme.secondary.backgroundColor};
    outline: none;
  }
`;

const Input = ({
  type, name, label, placeholder, onChange, value, onBlur, className,
}) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <StyledInput
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
    />
  </>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  onChange: undefined,
  onBlur: undefined,
  className: '',
};

export default Input;
