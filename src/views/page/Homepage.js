import React, { useContext } from 'react';
import PageContext from 'context';

const Homepage = () => {
  const theme = useContext(PageContext);
  // const theme = useContext(ThemeContext);
  const { toggleSidebarTheme } = theme;
  console.log(theme);
  // console.log('dupa');

  return (
    <>
      <h3>wfewefweewfwefwefwefweewfwewefwefwef</h3>
      <input type="button" value="light" onClick={toggleSidebarTheme} />
      <input type="button" value="brown" onClick={toggleSidebarTheme} />
    </>
  );
};

export default Homepage;
