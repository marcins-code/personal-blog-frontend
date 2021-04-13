import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { PageContext } from 'context';
import MainTemplate from 'templates/MainTemplate';
// import { PageContext } from 'context';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import { glossaryPagePhrazes } from 'languages/glossaryPagePhrazes';

const ManageGlossary = (props) => {
  const { lang } = useContext(PageContext);
  return (
    <MainTemplate>
      <AdminPageWrapper>
        <PageHeader title={glossaryPagePhrazes[lang].formTitle} icon={['far', 'edit']} />
      </AdminPageWrapper>
    </MainTemplate>
  );
};

ManageGlossary.propTypes = {};

export default ManageGlossary;
