import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { commonTheme, darkTheme } from 'themes/Theme';
import InputWrapper from 'components/atoms/Wrappers/InputWrapper';
import FormikError from 'components/molecules/FormikError/FormikError';
import FormikLabel from 'components/molecules/FormikLabel/FormikLabel';

const theme = { ...commonTheme, ...darkTheme };

const StyledInput = styled.input`
  height: 40px;
  font-size: 1.6rem;
  padding: 0 10px;
  color: ${theme.color};
  background-color: ${theme.dark.backgroundDarken};
  border-radius: 10px;
  border: solid 2px ${theme.light.backgroundDarken};

  &:focus,
  :active {
    border-color: ${theme.secondary.backgroundColor};
    outline: none;
  }

  &.success {
    border-color: #639a72;
  }
  &.error {
    border-color: #c95858;
    background-color: #731700;
  }
`;

const FormikInput = ({
  type,
  name,
  label,
  placeholder,
  onChange,
  value,
  onBlur,
  touched,
  errors,
  labelIcon,
}) => {
  let inputStatusClassses;
  if (touched && !errors) {
    inputStatusClassses = 'success';
  }
  if ((touched && errors) || (value.length > 3 && errors)) {
    inputStatusClassses = 'error';
  }

  return (
    <InputWrapper>
      {label && <FormikLabel labelFor={name} labelIcon={labelIcon} label={label} />}
      <StyledInput
        type={type}
        label={label}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        touched={touched}
        className={inputStatusClassses}
      />
      <FormikError errors={errors} touched={touched} value={value} />
    </InputWrapper>
  );
};

FormikInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  touched: PropTypes.bool,
  errors: PropTypes.string,
  labelIcon: PropTypes.instanceOf(Array),
};

FormikInput.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  onChange: undefined,
  onBlur: undefined,
  touched: undefined,
  errors: undefined,
  labelIcon: [],
};

export default FormikInput;
