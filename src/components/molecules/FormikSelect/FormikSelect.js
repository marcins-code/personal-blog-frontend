import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSelect = styled.select``;

const FormikSelect = ({
  name, value, onChange, onBlur, optionItems,
}) => {
  console.log('dupa');

  return (
    <StyledSelect name={name} value={value} onChange={onChange} onBlur={onBlur}>
      <option value="blue" label="blue" />
      <option value="green" label="green" />
    </StyledSelect>
  );
};

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  optionItems: PropTypes.instanceOf(Array).isRequired,
};

export default FormikSelect;
