import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledTableWrapper = styled.div`
  position: relative;
  width: 90%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  border: solid 3px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  ${(props) => props.tblCenter
    && css`
      margin: auto;
    `}
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  overflow: hidden;
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
    to top,
    ${({ theme }) => theme.info.backgroundColor},
    ${({ theme }) => theme.info.backgroundColorDarken}
  );

  > th {
    padding: 20px 10px;
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
    border-spacing: 0;
  }
`;

const Table = ({
  headerItems, children, tblCenter, tblHover,
}) => (
  <StyledTableWrapper tblCenter>
    <StyledTable tblHover>
      <StyledTableHeader>
        {headerItems.map((item) => (
          <th>{item}</th>
        ))}
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
};

Table.defaultProps = {
  headerItems: [],
  children: null,
  tblCenter: false,
  tblHover: false,
};

export default Table;
