import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StyledButtonCSS } from 'components/atoms/StyledButtonCSS/StyledButtonCSS';

const StyledButton = styled.button`
  ${StyledButtonCSS}
`;

// const StyledLink = styled.a`
// text-decoration: none;
// ${StyledButtonCSS}
// `;

const Button = ({
  btnColor, btnBig, btnSmall, btnClick, type, style, href, children, to,
}) => (
  <StyledButton
    style={style}
    btnColor={btnColor}
    btnBig={btnBig}
    btnSmall={btnSmall}
    onClick={btnClick}
    type={type}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  to: PropTypes.string,
  btnColor: PropTypes.string,
  btnBig: PropTypes.bool,
  btnSmall: PropTypes.bool,
  btnClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(Object),
};

Button.defaultProps = {
  children: undefined,
  btnColor: 'dark',
  btnBig: false,
  btnSmall: false,
  btnClick: null,
  style: undefined,
  href: undefined,
  to: undefined,
};

export default Button;
