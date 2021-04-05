import React from 'react';
import MainTemplate from 'templates/MainTemplate';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import ArticleTypeForm from 'components/organism/Forms/ArticleTypeForm';

const ManageArticleTypes = (props) => (
  <MainTemplate>
    <AdminPageWrapper>
      <h5>Categories</h5>
      <ArticleTypeForm />
    </AdminPageWrapper>
  </MainTemplate>
);

ManageArticleTypes.propTypes = {};

export default ManageArticleTypes;
