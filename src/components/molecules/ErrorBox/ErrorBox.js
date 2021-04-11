import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { commonFormPhrazes } from 'languages/commonFormPhrazes';
import { PageContext } from 'context';

const StyledErrorCode = styled.h1`
  font-size: 15rem;
  text-align: center;
  color: ${({ theme }) => darken(0.12, theme.appBackgroundColor)};
  text-shadow: -1px 1px 1px ${({ theme }) => lighten(0.1, theme.appBackgroundColor)};
`;

const StyledText = styled.h3`
  text-align: center;
`;
const ErrorBox = ({ errorCode }) => {
  const { lang } = useContext(PageContext);
  return (
    <>
      <StyledErrorCode>{errorCode}</StyledErrorCode>
      <StyledText>{commonFormPhrazes[lang].errors[`e${errorCode}`]}</StyledText>
    </>
  );
};

ErrorBox.propTypes = {
  errorCode: PropTypes.number.isRequired,
};

export default ErrorBox;
