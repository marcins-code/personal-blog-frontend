import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { PageContext } from 'context';
import MainTemplate from 'templates/MainTemplate';
import PageHeader from 'components/molecules/PageHeader/PageHeader';
import { glossaryPagePhrazes } from 'languages/glossaryPagePhrazes';

const Glossary = (props) => {
  const { lang } = useContext(PageContext);
  return (
    <MainTemplate>
      <PageHeader title={glossaryPagePhrazes[lang].title} icon={['fas', 'sort-alpha-down']} />
    </MainTemplate>
  );
};

Glossary.propTypes = {};

export default Glossary;
