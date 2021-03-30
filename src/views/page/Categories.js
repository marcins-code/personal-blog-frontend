import Button from 'components/atoms/Button/Button';
import React from 'react';
import PageTemplate from 'templates/MainTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Categories = (props) => (
  <PageTemplate>
    <h2>Categories</h2>
    <div>
      <FontAwesomeIcon icon={['fas', 'coffee']} />
      <Button
        type="button"
        labelIcon={['fas', 'check']}
        btnColor="secondary"
        btnOutline
        label="Moó button"
      />
    </div>
  </PageTemplate>
);

export default Categories;
