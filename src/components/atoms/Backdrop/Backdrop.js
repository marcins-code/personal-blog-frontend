import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { transparentize } from 'polished';
import 'assets/css/animations.css';

const StyledBackdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => transparentize(0.15, theme.grey900)};
  z-index: 301;
  top: 0;
  left: 0;
`;

const Backdrop = ({ onClick, bckdShow }) => (
  <CSSTransition in={bckdShow} mountOnEnter unmountOnExit timeout={900} classNames="backdrop">
    <StyledBackdrop onClick={onClick} />
  </CSSTransition>
);

Backdrop.propTypes = {
  onClick: PropTypes.func,
  bckdShow: PropTypes.bool.isRequired,
};

Backdrop.defaultProps = {
  onClick: undefined,
};
export default Backdrop;
