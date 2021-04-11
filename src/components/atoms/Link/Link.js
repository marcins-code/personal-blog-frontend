/* eslint-disable react/prop-types */
// import React from 'react';
// import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';
import { getContrast } from 'polished';

const Link = styled.a`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  ${(props) => props.btncolor
    && css`
      background: ${({ theme, btncolor }) => theme[btncolor]};
      color: ${({ theme, btncolor }) => (getContrast(theme[btncolor], theme.grey100) > 4.1 ? theme.grey100 : theme.wax)};
      padding: 10px;
      border-radius: 20%;
    `}
`;

// const Link = ({ children, href, to }) => (
//   <StyledLink href={href}>{children}</StyledLink>

// );

// Link.propTypes = {
//   children: PropTypes.node,
// };

// Link.defaultProps = {
//   children: null,
// };

export default Link;
