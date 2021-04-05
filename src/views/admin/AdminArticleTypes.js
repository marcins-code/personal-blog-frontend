/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import MainTemplate from 'templates/MainTemplate';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import Button from 'components/atoms/Button/Button';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from 'context';
import Spinner from 'components/molecules/Spinner/Spinner';

const StyledAdminPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledPageHeader = styled.h3`
  flex: 50%;
`;

const AdminArticleTypes = () => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthContext);
  useEffect(() => {
    const regHeaders = new Headers();
    regHeaders.append('Content-Type', 'application/json');
    regHeaders.append('Authorization', `Bearer ${auth.token}`);

    const getData = async () => {
      try {
        const response = await fetch(`${baseUrl}/article-type`, {
          method: 'GET',
          headers: regHeaders,
        });
        const responseData = await response.json();
        setTimeout(() => {
          setResData(responseData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };
    return getData();
  }, []);

  // console.log(load);
  // const { isLoading } = useApi('/article-type', 'GET', '', load, setLoad, false, setResData);
  //
  // console.log(isLoading);
  // setResData(resultData);
  // useEffect(() => {
  //   setResData(resultData);
  // }, [resultData]);
  return (
    <MainTemplate>
      <AdminPageWrapper>
        {isLoading && <Spinner />}
        <StyledAdminPageWrapper>
          <StyledPageHeader>Categories</StyledPageHeader>
          <NavLink to="/admin/manage-article-type">
            <Button type="button" label="New Article type" btnColor="secondary" btnSmall />
          </NavLink>
        </StyledAdminPageWrapper>

        {!isLoading && resData.map((item) => <p>{item.titlePL}</p>)}
      </AdminPageWrapper>
    </MainTemplate>
  );
};

export default AdminArticleTypes;
// TODO refcrot
