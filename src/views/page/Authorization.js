import React from 'react';
// import Button from 'components/atoms/Button/Button';
import MainTemplate from 'templates/MainTemplate';
import LoginForm from 'components/organism/Forms/LoginForm';

const Authorization = (props) => (
  <MainTemplate>
    <LoginForm />
  </MainTemplate>
);

Authorization.propTypes = {};

export default Authorization;

// TODO Add signUP module
