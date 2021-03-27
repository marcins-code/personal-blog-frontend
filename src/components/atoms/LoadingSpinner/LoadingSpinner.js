import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => (
  // eslint-disable-next-line react/prop-types
  <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
    <div className="lds-dual-ring" />
  </div>
);

export default LoadingSpinner;
