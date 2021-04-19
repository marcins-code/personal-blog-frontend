import React, { useContext } from 'react';
import { PageContext } from 'context';
import MainTemplate from 'templates/MainTemplate';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import { articlePagePhrazes } from 'languages/articlePagePhrazes';
import ArticleForm from 'components/organism/Forms/ArticleForm';

const ManageArticle = (props) => {
  const { lang } = useContext(PageContext);
  return (
    <MainTemplate>
      <AdminPageWrapper>
        <PageHeader title={articlePagePhrazes[lang].formTitle} icon={['far', 'edit']} />
        <ArticleForm />
      </AdminPageWrapper>
    </MainTemplate>
  );
};

ManageArticle.propTypes = {};

export default ManageArticle;
