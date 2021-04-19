import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  darken, transparentize, getContrast, lighten,
} from 'polished';
import classyFabric from 'assets/images/backgrounds/classy-fabric.png';

const StyledTableWrapper = styled.div`
  position: relative;
  width: 95%;
  border-radius: 20px;
  border: solid 3px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  background-color: ${({ theme }) => (theme.themeName !== 'light'
    ? transparentize(0.85, theme.black)
    : transparentize(0.85, theme.grey100))};
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  display: table;
  ${(props) => props.tblColor
    && css`
      > tbody > tr {
        &:hover {
          background-color: ${({ theme }) => (props.tblColor
    ? transparentize(0.75, theme[props.tblColor])
    : transparentize(0.75, theme.black))};
        }
      }
    `}
`;

const StyledTableHeader = styled.thead`
  ${(props) => props.tblColor
    && css`
      box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.4);
      background-image: url(${classyFabric}),
        linear-gradient(
          90deg,
          ${({ theme }) => darken(0.1, theme[props.tblColor])} 20%,
          ${({ theme }) => darken(0.05, theme[props.tblColor])} 50%,
          ${({ theme }) => darken(0.03, theme[props.tblColor])} 70%,
          ${({ theme }) => darken(0.1, theme[props.tblColor])} 80%
        );
      & > tr {
        border-bottom: 5px inset ${({ theme }) => lighten(0.06, theme[props.tblColor])};
      }
      & > tr > th {
        color: ${({ theme }) => (getContrast(theme[props.tblColor], theme.grey100) > 4.1 ? theme.grey100 : theme.wax)};
        padding-top: 5px;
      }
    `}
  background-attachment: fixed;

  > tr {
    height: 55px;
  }
`;

const StyledTableBody = styled.tbody`
  > tr > td {
    padding: 10px 20px;
    text-align: center;
  }
  ${(props) => props.tblStripped
    && css`
      > tr:nth-child(odd) {
        background: ${({ theme }) => (theme.themeName !== 'light'
    ? transparentize(0.8, theme.black)
    : transparentize(0.75, theme.grey100))};
        border-top: 1px solid
          ${({ theme }) => (theme.themeName !== 'light'
    ? transparentize(0.05, theme.black)
    : transparentize(0.05, theme.grey100))};
        border-bottom: 1px solid
          ${({ theme }) => (theme.themeName !== 'light'
    ? transparentize(0.05, theme.black)
    : transparentize(0.05, theme.grey100))};
      }

      > tr:last-child {
        border-bottom: none !important;
      }
      > tr:first-child {
        border-top: none;
      }
    `}
`;

const Table = ({
  headerItems, children, tblHover, tblStripped, tblColor,
}) => (
  <StyledTableWrapper className="fadeIn" t>
    <StyledTable tblHover={tblHover} tblColor={tblColor}>
      <StyledTableHeader tblColor={tblColor}>
        <tr>
          {headerItems.map((item) => (
            <th key={item.id}>{item.title}</th>
          ))}
        </tr>
      </StyledTableHeader>
      <StyledTableBody tblStripped={tblStripped}>{children}</StyledTableBody>
    </StyledTable>
  </StyledTableWrapper>
);

Table.propTypes = {
  headerItems: PropTypes.instanceOf(Array),
  children: PropTypes.node,
  tblHover: PropTypes.bool,
  tblStripped: PropTypes.bool,
  tblColor: PropTypes.string,
};

Table.defaultProps = {
  headerItems: [],
  children: null,
  tblHover: false,
  tblStripped: false,
  tblColor: null,
};

export default Table;

// TODO manage colors
