import Button from 'components/atoms/Button/Button';
import React from 'react';
import PageTemplate from 'templates/PageTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Homepage = (props) => (
  <PageTemplate>
    <h2>Homepage</h2>
    <div>
      <FontAwesomeIcon icon={['fas', 'coffee']} />
      <Button icon="far address-book" btnColor="secondary" btnOutline label="Moó button" />
    </div>
  </PageTemplate>
);

export default Homepage;
