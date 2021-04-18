// import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { getContrast } from 'polished';
import { StyledButtonCSS } from 'components/atoms/StyledButtonCSS/StyledButtonCSS';

const Link = styled.a`
  color: ${({ theme }) => theme.secondary};
  ${StyledButtonCSS}
`;

export const StyledLinkAsButton = styled.a`
  ${StyledButtonCSS}
  text-decoration: none;
  text-align: center;
  padding-top: 10px;
`;

export default Link;
