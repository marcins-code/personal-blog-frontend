import React from 'react';
import PropTypes from 'prop-types';

import './Spinner.css';

const Spinner = ({ text }) => (
  <div id="spinner-wrapper">
    <div id="spinner" />
    <h5 className="spinner-text">{text}</h5>
  </div>
);

Spinner.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Spinner;
// TODO to finish styles
