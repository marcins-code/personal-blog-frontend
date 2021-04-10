import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getContrast, rgba } from 'polished';

const StyledButton = styled.button`
  padding: 8px 10px;
  border-radius: 10px;
  /* color: ${({ theme }) => theme.color}; */
  font-size: 1.6rem;
  font-weight: normal;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: auto;
  border: solid 2px transparent;
  &:focus,
  :active {
    outline: none;
  }
  > svg{ margin-right:6px }


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
    && !props.btnOutline
    && css`
      background-color: ${({ theme }) => theme[props.btnColor]};
      /* box-shadow: 0 1px 2px 1px
        ${({ theme }) => (theme.themeName !== 'light' ? rgba(theme.black, 0.95) : rgba(theme.black, 0.5))}; */
      /* transition: box-shadow 1s; */
      color: ${({ theme }) => (getContrast(theme[props.btnColor], theme.grey100) > 4.1 ? theme.grey100 : theme.wax)};
      &:hover {
        /* box-shadow: 0 0 15px 3px ${({ theme }) => rgba(theme.black, 0.5)}; */
        /* transition: box-shadow 1s; */
        /* transition: box-shadow 1s linear; */
      }
    `}



    ${(props) => props.btnColor
      && props.btnOutline
      && css`
        background: transparent;
        box-shadow: none !important;
        border: solid 2px ${({ theme }) => theme[props.btnColor]};
        color: ${({ theme }) => theme[props.btnColor]};
        transition: background 500ms;

        &:hover {
          border: solid 2px transparent;
          background: ${({ theme }) => theme[props.btnColor]};
          color: ${({ theme }) => (getContrast(theme[props.btnColor], theme.grey100) > 4.1 ? theme.grey100 : theme.wax)};
          transition: background 500ms;
          box-shadow: !important;
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
  style,
}) => (
  <StyledButton
    style={style}
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
  btnColor: PropTypes.string,
  btnOutline: PropTypes.bool,
  btnBig: PropTypes.bool,
  btnSmall: PropTypes.bool,
  label: PropTypes.string,
  btnClick: PropTypes.func,
  labelIcon: PropTypes.instanceOf(Array),
  type: PropTypes.string.isRequired,
  btnIcon: PropTypes.bool,
  style: PropTypes.instanceOf(Object),
};

Button.defaultProps = {
  btnColor: 'dark',
  btnOutline: false,
  btnBig: false,
  btnSmall: false,
  label: '',
  btnClick: null,
  labelIcon: null,
  btnIcon: false,
  style: undefined,
};

export default Button;

// TODO change box shadows and colors
