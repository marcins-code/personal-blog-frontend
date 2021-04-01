import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { commonTheme, darkTheme } from 'themes/Theme';
import InputWrapper from 'components/atoms/Wrappers/InputWrapper';
import FormikError from 'components/molecules/FormikError/FormikError';
import FormikLabel from 'components/molecules/FormikLabel/FormikLabel';

const theme = { ...commonTheme, ...darkTheme };
const StyledSelect = styled.select`
  height: 40px;
  width: 100;
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
const FormikSelect = ({
  name,
  value,
  onChange,
  onBlur,
  optionItems,
  touched,
  errors,
  labelIcon,
  label,
  placeholder,
}) => {
  let inputStatusClassses;
  if (touched && !errors) {
    inputStatusClassses = 'success';
  }
  if (touched && errors) {
    inputStatusClassses = 'error';
  }
  return (
    <InputWrapper>
      {label && <FormikLabel labelFor={name} labelIcon={labelIcon} label={label} />}
      <StyledSelect
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={inputStatusClassses}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {optionItems.map((item) => (
          <option value={item.value} label={item.label} key={item.value} />
        ))}
      </StyledSelect>
      <FormikError errors={errors} touched={touched} />
    </InputWrapper>
  );
};

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  touched: PropTypes.bool,
  errors: PropTypes.string,
  labelIcon: PropTypes.instanceOf(Array),
  optionItems: PropTypes.instanceOf(Array).isRequired,
  placeholder: PropTypes.string,
};

FormikSelect.defaultProps = {
  label: '',
  onChange: undefined,
  onBlur: undefined,
  touched: undefined,
  errors: undefined,
  labelIcon: undefined,
  placeholder: 'Please choose',
};

export default FormikSelect;
