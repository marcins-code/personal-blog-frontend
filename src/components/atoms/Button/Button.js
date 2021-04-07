import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  padding: 8px 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.color};
  font-size: 1.6rem;
  font-weight: normal;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.2s linear;
  width: auto;
  border: solid 1px transparent;

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
  }

  > svg{ margin-right:3px }


  ${(props) => props.btnIcon
    && css`
      display: flex;
      padding: 10px !important;
      border-radius: 20%;
      > svg {
        margin: auto !important;
      }
    `}

  ${(props) => props.btnColor
    && css`
      background-color: ${({ theme }) => theme[props.btnColor].backgroundColor};
      box-shadow: 0px 1px 1px 2px ${({ theme }) => theme[props.btnColor].backgroundColorDarken},
        0px 0px 1px ${({ theme }) => theme[props.btnColor].backgroundColorDarken} inset;
      color: ${({ theme }) => theme[props.btnColor].color};
    `}

    ${(props) => props.btnColor
      && props.btnOutline
      && css`
        background: transparent;
        box-shadow: none;
        border: solid 2px ${({ theme }) => theme[props.btnColor].backgroundColor};
        color: ${({ theme }) => theme[props.btnColor].backgroundColor};

        &:hover {
        }
      `}
    ${(props) => props.btnBig
      && css`
        font-size: 1.9rem;
        padding: 10px;
      `}

  ${(props) => props.btnSmall
    && css`
      font-size: 1.3rem;
      padding: 5px 8px;
    `}
`;

const Button = ({
  btnColor,
  btnOutline,
  btnBig,
  btnSmall,
  label,
  btnClick,
  labelIcon,
  type,
  btnIcon,
}) => (
  <StyledButton
    btnColor={btnColor}
    btnOutline={btnOutline}
    btnBig={btnBig}
    btnSmall={btnSmall}
    labelIcon={labelIcon}
    onClick={btnClick}
    type={type}
    btnIcon={btnIcon}
  >
    {labelIcon && <FontAwesomeIcon icon={labelIcon} />}
    {!btnIcon && label}
  </StyledButton>
);

Button.propTypes = {
  btnColor: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'light', 'dark']),
  btnOutline: PropTypes.bool,
  btnBig: PropTypes.bool,
  btnSmall: PropTypes.bool,
  label: PropTypes.string,
  btnClick: PropTypes.func,
  labelIcon: PropTypes.instanceOf(Array),
  type: PropTypes.string.isRequired,
  btnIcon: PropTypes.bool,
};

Button.defaultProps = {
  btnColor: 'primary',
  btnOutline: false,
  btnBig: false,
  btnSmall: false,
  label: '',
  btnClick: null,
  labelIcon: null,
  btnIcon: false,
};

export default Button;
