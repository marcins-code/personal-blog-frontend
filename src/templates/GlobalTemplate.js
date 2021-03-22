import React, { useState, useEffect } from 'react';
// import React from 'react';
import useWindowSize from 'hooks/useWindowSize';
import PageContext from 'context';
// import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const GlobalTemplate = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  const size = useWindowSize();
  useEffect(() => {
    setIsMobile(size.width <= 760);
  }, [size]);

  return (
    <PageContext.Provider
      value={{
        isMobile,
      }}
    >
      <>{props.children}</>
    </PageContext.Provider>
  );
};

GlobalTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};
export default GlobalTemplate;
