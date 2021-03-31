import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './style.css';

const StyledErrorContainer = styled.div`
  background-color: #bc2600;
  border: ridge 2px #eb5934;
  position: absolute;
  font-size: 1.4rem;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px -3px rgba(0, 0, 0, 1) inset;
  z-index: 10;
`;
const FormikError = ({ errors, touched }) => {
  const animRef = useRef(null);
  return (
    <CSSTransition
      in={Boolean(touched) && Boolean(errors)}
      timeout={200}
      classNames="formik-error"
      unmountOnExit
      animRef={animRef}
    >
      <StyledErrorContainer ref={animRef}>
        <FontAwesomeIcon icon="exclamation-triangle" />
        &nbsp;
        {errors}
      </StyledErrorContainer>
    </CSSTransition>
  );
};

FormikError.propTypes = {
  errors: PropTypes.string,
  touched: PropTypes.bool,
};

FormikError.defaultProps = {
  errors: '',
  touched: undefined,
};

export default FormikError;
