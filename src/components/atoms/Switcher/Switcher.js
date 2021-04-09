import React from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const StyledInput = styled.input.attrs((props) => ({
  type: props.type || 'checkbox',
}))`
  ${(props) => props.notCheckedColor
    && css`
      background: linear-gradient(
        ${({ theme }) => theme[props.notCheckedColor]},
        ${({ theme }) => theme[props.notCheckedColor]}
      );
    `}
  margin: 10px;
  position: relative;
  width: 40px;
  height: 20px;
  -webkit-appearance: none;
  /* background: linear-gradient(0deg, #333, #000); */
  outline: none;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0, 0, 0, 1);
  box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0, 0, 0, 1);
  &:checked {
    ${(props) => props.switchColor
      && css`
        background-image: linear-gradient(
          ${({ theme }) => theme[props.switchColor]},
          ${({ theme }) => theme[props.switchColor]}
        );
        box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0, 0, 0, 1);
      `}
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(0deg, #000, #6b6b6b);
    border-radius: 20px;
    box-shadow: 0 0 0 1px #232323;
    transform: scale(0.98, 0.96);
    transition: 0.5s;
  }

  &:checked:before {
    left: 20px;
  }

  &:after {
    content: '';
    position: absolute;
    top: calc(50% - 2px);
    left: 20px;
    width: 0px;
    height: 4px;
    background: linear-gradient(0deg, #6b6b6b, #000);
    border-radius: 50%;
  }
`;

const Switcher = ({
  name,
  change,
  clicked,
  isChecked,
  switchColor,
  type,
  notCheckedColor,
  value,
}) => (
  <StyledInput
    switchColor={switchColor}
    name={name}
    onChange={change}
    onClick={clicked}
    defaultChecked={isChecked}
    type={type}
    notCheckedColor={notCheckedColor}
    value={value}
  />
);

Switcher.propTypes = {
  name: propTypes.string.isRequired,
  change: propTypes.func,
  clicked: propTypes.func,
  isChecked: propTypes.bool,
  switchColor: propTypes.string,
  type: propTypes.string.isRequired,
  notCheckedColor: propTypes.string,
  value: propTypes.string,
};

Switcher.defaultProps = {
  isChecked: false,
  change: null,
  clicked: null,
  switchColor: 'primary',
  notCheckedColor: 'dark',
  value: '',
};

export default Switcher;
