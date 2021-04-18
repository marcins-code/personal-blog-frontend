/* eslint-disable no-template-curly-in-string */
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import { AuthContext } from 'context';
import Spinner from 'components/atoms/Spinner/Spinner';
import Card from 'components/molecules/Card/Card';
import Link from 'components/atoms/Link/Link';

const StyleWraperr = styled.div`
  position: relative;
  padding-top: 50px;
`;

const LoginForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: 'email@email.com',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Field is required').email('Please enter email adress'),
      password: Yup.string()
        .required('Please enter password')
        .min(6, 'Password must have min ${min} characters')
        .max(50, 'Password must have max ${max} characters'),
    }),
    // eslint-disable-next-line consistent-return
    onSubmit: async (values, { setFieldError }) => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          if (responseData.message === 'Invalid password') {
            setFieldError('password', responseData.message);
          }
          if (responseData.message === 'Invalid email') {
            setFieldError('email', responseData.message);
          }
        }

        auth.login(
          response.ok,
          responseData.userId,
          responseData.roles,
          responseData.firstName,
          responseData.lastName,
          responseData.token,
          responseData.tokenExpiration,
        );
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    },
  });

  return (
    <StyleWraperr>
      <Card cardColor="green" cardMedium cardCenter title="Logowanie">
        {isLoading && <Spinner />}
        {!auth.isLoggedIn ? (
          <form onSubmit={formik.handleSubmit}>
            <FormikInput
              type="text"
              name="email"
              label="Podaj email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email.trimStart()}
              touched={formik.touched.email}
              errors={formik.errors.email}
            />
            <FormikInput
              type="password"
              name="password"
              label="Podaj hasło"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password.trimStart()}
              touched={formik.touched.password}
              errors={formik.errors.password}
            />
            <Button
              labelIcon={['fas', 'sign-in-alt']}
              type="submit"
              btnColor="primary"
              label="Zaloguj"
            />
            <Button
              labelIcon={['fas', 'sign-in-alt']}
              type="submit"
              btnColor="secondary"
              label="Zaloguj"
            />
          </form>
        ) : (
          <>
            <h3>{`Jesteś zalogowany jako ${auth.userFirstName} ${auth.userLastName}`}</h3>
            <Button type="button" btnClick={auth.logout} label="logout" btnColor="indygo" />
          </>
        )}
      </Card>
      <Link btn btnColor="blue">
        qwfqwqwfqwf
      </Link>
    </StyleWraperr>
  );
};

export default LoginForm;

// TODO Add styles and errors mamgement
