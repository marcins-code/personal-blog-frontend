import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputWrapper from 'components/atoms/Wrappers/InputWrapper';
import FormikError from 'components/molecules/FormikError/FormikError';
import FormikLabel from 'components/molecules/FormikLabel/FormikLabel';

const StyledSelect = styled.select`
  height: 40px;
  width: 100%;
  min-width: 150px;
  font-size: 1.6rem;
  padding: 0 10px;
  -webkit-appearance: menulist-button;
  --moz-appearance: menulist-button;
  &:focus,
  :active {
    outline: none;
  }

  &.success {
    /* background: #639a72; */
  }
  &.error {
    border-color: #c95858;
    background-color: #731700;
    color: #fff;
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
