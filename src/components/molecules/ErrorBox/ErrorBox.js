import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { commonPhrazes } from 'languages/commonPhrazes';
import { PageContext } from 'context';

const StyledErrorCode = styled.h1`
  font-size: 10rem;
  text-align: center;
  color: ${({ theme }) => darken(0.12, theme.appBackgroundColor)};
  text-shadow: -1px 1px 1px ${({ theme }) => lighten(0.1, theme.appBackgroundColor)};
`;

const StyledText = styled.h3`
  text-align: center;
`;
const ErrorBox = ({ errorCode, children }) => {
  const { lang } = useContext(PageContext);
  return errorCode ? (
    <>
      <StyledErrorCode>{errorCode}</StyledErrorCode>
      <StyledText>{commonPhrazes[lang].errors[`e${errorCode}`]}</StyledText>
    </>
  ) : (
    <StyledErrorCode>{children}</StyledErrorCode>
  );
};

ErrorBox.propTypes = {
  errorCode: PropTypes.number,
  children: PropTypes.node,
};

ErrorBox.defaultProps = {
  children: undefined,
  errorCode: undefined,
};

export default ErrorBox;
