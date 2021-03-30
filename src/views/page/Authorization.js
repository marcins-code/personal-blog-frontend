import React, { useState } from 'react';
import Button from 'components/atoms/Button/Button';
import MainTemplate from 'templates/MainTemplate';

const Authorization = (props) => {
  const [isLoggin, setIsLoggin] = useState(true);
  console.log(isLoggin);

  return (
    <MainTemplate>
      <Button type="button" label="SignUp" btnClick={() => setIsLoggin(false)} />
    </MainTemplate>
  );
};

Authorization.propTypes = {};

export default Authorization;
