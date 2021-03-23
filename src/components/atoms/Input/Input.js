import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type, name, label, placeholder, onChange, value,
}) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  value: '',
  onChange: undefined,
};

export default Input;
