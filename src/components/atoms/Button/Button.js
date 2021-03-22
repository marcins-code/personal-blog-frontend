import React from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const StyledButton = styled.button`
  padding: 8px 15px;
  border-radius: 15px;
  color: ${({ theme }) => theme.color};
  font-size: 1.6rem;
  font-weight: normal;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.2s linear;
  width: auto;

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.4);
  }

  ${(props) => props.switch
    && css`
      border-radius: 50%;
      height: 40px;
      width: 42px;
      /* border-style: solid !important; */
      border-width: 1px !important;
    `}

  ${(props) => props.btnColor
    && css`
      background-image: linear-gradient(
        ${({ theme }) => theme[props.btnColor].backgroundColor},
        ${({ theme }) => theme[props.btnColor].backgroundDarken}
      );
      border: solid 1px ${({ theme }) => theme[props.btnColor].backgroundColor};
    `}

    ${(props) => props.btnColor
      && props.btnOutline
      && css`
        background: transparent;
        border: solid 2px ${({ theme }) => theme[props.btnColor].backgroundColor};
        color: ${({ theme }) => theme[props.btnColor].backgroundColor};

        &:hover {
          background: ${({ theme }) => theme[props.btnColor].backgroundColor};
          color: ${({ theme }) => (theme[props.btnColor].color ? theme[props.btnColor].color : theme.grey100)};
        }
      `};

  ${(props) => props.btnBig
    && css`
      font-size: 1.8rem;
      padding: 15px 20px;
    `}

  ${(props) => props.btnSmall
    && css`
      font-size: 1.3rem;
      padding: 5px 8px;
    `}
`;

const StyledSwitchButton = styled.input.attrs({ type: 'button' })`
  width: 30px;
  height: 30px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  margin: 10px;
  color: transparent;
  cursor: pointer;
  ${(props) => props.btnColor
    && css`
      background-image: linear-gradient(
        ${({ theme }) => theme[props.btnColor].backgroundColor},
        ${({ theme }) => theme[props.btnColor].backgroundDarken}
      );
      border: groove 1px ${({ theme }) => theme[props.btnColor].backgroundDarken};
    `}
  &:active, :focus {
    outline: none;
  }

  &.active {
    border-color: ${({ theme }) => theme.primary.backgroundColor};
    border-width: 3px;
  }
`;

const Button = ({
  btnColor,
  btnOutline,
  btnBig,
  btnSmall,
  children,
  clicked,
  btnSwitch,
  value,
  classess,
}) => {
  if (!btnSwitch) {
    return (
      <StyledButton
        btnColor={btnColor}
        btnOutline={btnOutline}
        btnBig={btnBig}
        btnSmall={btnSmall}
        onClick={clicked}
      >
        {children}
      </StyledButton>
    );
  }

  return (
    <StyledSwitchButton btnColor={btnColor} value={value} onClick={clicked} className={classess} />
  );
};

Button.propTypes = {
  classess: propTypes.string,
  btnSwitch: propTypes.bool,
  btnColor: propTypes.string,
  btnOutline: propTypes.bool,
  btnBig: propTypes.bool,
  btnSmall: propTypes.bool,
  children: propTypes.string,
  clicked: propTypes.func,
  value: propTypes.string,
};

Button.defaultProps = {
  classess: null,
  btnSwitch: false,
  btnColor: 'primary',
  btnOutline: false,
  btnBig: false,
  btnSmall: false,
  children: '',
  clicked: null,
  value: undefined,
};

export default Button;
