import React, { useContext } from 'react';
import MainTemplate from 'templates/MainTemplate';
import { PageContext } from 'context';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import ArticleTypeForm from 'components/organism/Forms/ArticleTypeForm';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import { articleTypesPagePhrazes } from 'languages/articleTypesPagePhrazes';

const ManageArticleTypes = (props) => {
  const { lang } = useContext(PageContext);

  return (
    <MainTemplate>
      <AdminPageWrapper>
        <PageHeader title={articleTypesPagePhrazes[lang].formTitle} icon={['far', 'edit']} />
        <ArticleTypeForm />
      </AdminPageWrapper>
    </MainTemplate>
  );
};

ManageArticleTypes.propTypes = {};

export default ManageArticleTypes;
