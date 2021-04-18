import React from 'react';
import MainTemplate from 'templates/MainTemplate';
import PageHeader from 'components/molecules/PageHeader/PageHeader';

const Categories = (props) => (
  <MainTemplate>
    <PageHeader title="Categories" icon={['fas', 'stream']} />
  </MainTemplate>
);

export default Categories;
