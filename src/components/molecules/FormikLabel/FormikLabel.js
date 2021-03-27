import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  > svg {
    margin-right: 5px;
  }
`;

const FormikLabel = ({ label, labelIcon, labelFor }) => (
  <>
    {/* {labelIcon && <FontAwesomeIcon icon={labelIcon} />} */}
    <StyledLabel htmlFor={labelFor}>
      {labelIcon && <FontAwesomeIcon icon={labelIcon} />}
      {label}
    </StyledLabel>
  </>
);

FormikLabel.propTypes = {
  label: PropTypes.string,
  labelIcon: PropTypes.instanceOf(Array),
  labelFor: PropTypes.string.isRequired,
};

FormikLabel.defaultProps = {
  label: '',
  labelIcon: [],
};

export default FormikLabel;
