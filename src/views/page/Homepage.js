// import Button from 'components/atoms/Button/Button';
import React, { useContext } from 'react';
import MainTemplate from 'templates/MainTemplate';
import { AuthContext } from 'context';

const Homepage = (props) => {
  const loginContext = useContext(AuthContext);
  // const { firstName } = loginContext;
  console.log(loginContext);
  return (
    <MainTemplate>
      <div>Home</div>
    </MainTemplate>
  );
};
export default Homepage;
