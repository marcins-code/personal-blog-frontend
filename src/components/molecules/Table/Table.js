import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

const StyledTableWrapper = styled.div`
  position: relative;
  width: 95%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  border: solid 3px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.15);
  overflow: scroll;
  ${(props) => props.tblCenter
    && css`
      margin: auto;
    `}
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  display: table;
  /* overflow: scroll; */
  ${(props) => props.tblHover
    && css`
      > tbody > tr {
        &:hover {
          background-color: rgba(0, 107, 169, 0.15);
          cursor: pointer;
        }
      }
    `}
`;

const StyledTableHeader = styled.thead`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.blue} 0%,
    ${({ theme }) => darken(0.1, theme.blue)} 50%,
    ${({ theme }) => theme.blue} 100%
  );
  background-attachment: fixed;
  > tr {
    height: 55px;

    /* border-bottom: solid 3px black; */
  }
`;

const StyledTableBody = styled.tbody`
  > tr:nth-child(odd) {
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    border-bottom: solid 1px rgba(0, 0, 0, 0.8);
    border-top: solid 1px rgba(0, 0, 0, 0.8);
  }
  > tr > td {
    padding: 10px 20px;
    text-align: center;
    /* border-spacing: 0; */
  }
`;

const Table = ({
  headerItems, children, tblCenter, tblHover, loading,
}) => (
  <StyledTableWrapper tblCenter>
    <StyledTable tblHover>
      <StyledTableHeader>
        <tr>
          {headerItems.map((item) => (
            <th key={item.id}>{item.title}</th>
          ))}
        </tr>
      </StyledTableHeader>
      <StyledTableBody>{children}</StyledTableBody>
    </StyledTable>
  </StyledTableWrapper>
);

Table.propTypes = {
  headerItems: PropTypes.instanceOf(Array),
  children: PropTypes.node,
  tblCenter: PropTypes.bool,
  tblHover: PropTypes.bool,
  loading: PropTypes.bool,
};

Table.defaultProps = {
  headerItems: [],
  children: null,
  tblCenter: false,
  tblHover: false,
  loading: false,
};

export default Table;

// TODO manage colors
