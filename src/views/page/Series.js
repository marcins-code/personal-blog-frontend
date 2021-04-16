// import Button from 'components/atoms/Button/Button';
import React from 'react';
import MainTemplate from 'templates/MainTemplate';
import PageHeader from 'components/molecules/PageHeader/PageHeader';

const Series = (props) => {
  console.log('poo');
  return (
    <MainTemplate>
      <PageHeader title="Series" icon={['fas', 'signal']} />
    </MainTemplate>
  );
};
export default Series;
