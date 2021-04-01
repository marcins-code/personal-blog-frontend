import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  font-weight: bold;
  padding: 0px 0px 5px 10px;
  > svg {
    margin-right: 5px;
  }
`;

const FormikLabel = ({ label, labelIcon, labelFor }) => (
  <>
    {/* {labelIcon && <FontAwesomeIcon icon={labelIcon} />} */}
    <StyledLabel htmlFor={labelFor}>
      {labelIcon ? <FontAwesomeIcon icon={labelIcon} /> : null}
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
  labelIcon: null,
};

export default FormikLabel;
