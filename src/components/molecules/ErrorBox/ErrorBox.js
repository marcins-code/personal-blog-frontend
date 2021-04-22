import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import { commonPhrazes } from 'languages/commonPhrazes';
import { PageContext } from 'context';

const StyledErrorCode = styled.h4`
  ${(props) => props.fontSmall
    && css`
      font-size: 3rem !important;
    `}
  ${(props) => props.fontMediun
    && css`
      font-size: 5rem !important;
    `}

    ${(props) => props.fontLarge
      && css`
        font-size: 8rem !important;
      `}
  /* font-size: 10rem; */
  text-align: center;
  color: ${({ theme }) => darken(0.12, theme.appBackgroundColor)};
  text-shadow: -1px 1px 1px ${({ theme }) => lighten(0.1, theme.appBackgroundColor)};
`;

const StyledText = styled.h3`
  text-align: center;
`;
const ErrorBox = ({
  errorCode, fontSmall, fontMediun, fontLarge, children,
}) => {
  const { lang } = useContext(PageContext);
  return errorCode ? (
    <>
      <StyledErrorCode fontSmall={fontSmall} fontMediun={fontMediun} fontLarge={fontLarge}>
        {errorCode}
      </StyledErrorCode>
      <StyledText>{commonPhrazes[lang].errors[`e${errorCode}`]}</StyledText>
    </>
  ) : (
    <StyledErrorCode fontSmall={fontSmall} fontMediun={fontMediun} fontLarge={fontLarge}>
      {children}
    </StyledErrorCode>
  );
};

ErrorBox.propTypes = {
  errorCode: PropTypes.number,
  children: PropTypes.node,
  fontSmall: PropTypes.bool,
  fontMediun: PropTypes.bool,
  fontLarge: PropTypes.bool,
};

ErrorBox.defaultProps = {
  children: undefined,
  errorCode: undefined,
  fontSmall: false,
  fontMediun: false,
  fontLarge: false,
};

export default ErrorBox;
