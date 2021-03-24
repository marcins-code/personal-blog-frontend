/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import GlobalStyle from 'themes/GlobalStyle';
import { commonTheme, darkTheme } from 'themes/Theme';
import AdminNavigation from '../components/organism/AdminNavigation/AdminNavigation';

const theme = { ...commonTheme, ...darkTheme };

const StyledAppWrapper = styled.div`
  background-color: ${theme.background};
  background-image: url(${theme.backgrounImage});
  color: ${theme.color};
  min-height: 100vh;
  display: flex;
`;

const StyledWarpper = styled.div`
  padding: 20px;
  width: 100%;
`;

const AdminTemplate = (props) => (
  <>
    <GlobalStyle />
    <StyledAppWrapper className="sidebar">
      <AdminNavigation />
      <StyledWarpper>{props.children}</StyledWarpper>
    </StyledAppWrapper>
  </>
);

export default AdminTemplate;
