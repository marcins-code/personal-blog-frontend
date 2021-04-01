import React, { useState } from 'react';
import Button from 'components/atoms/Button/Button';
import MainTemplate from 'templates/MainTemplate';
import LoginForm from 'components/organism/Forms/LoginForm';

const Authorization = (props) => {
  const [isLoggin, setIsLoggin] = useState(true);
  console.log(isLoggin);

  return (
    <MainTemplate>
      <LoginForm />
      <Button type="button" label="SignUp" btnClick={() => setIsLoggin(false)} />
    </MainTemplate>
  );
};

Authorization.propTypes = {};

export default Authorization;

// TODO Add signUP module
