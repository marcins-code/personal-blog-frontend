/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from 'components/atoms/Button/Button';
import * as Yup from 'yup';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import Codemirror from 'components/atoms/Codemirror/Codemirror';
import MainTemplate from 'templates/MainTemplate';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';

const AdminCategories = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      test: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().min(5, 'tylko').max(10, 'too long')
        .required('test i dupa'),
      test: Yup.string().trim().max(5, 'i dupa').required('wymagane'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify({ ...values, desc: descCode, modifiedAt: Date.now() }, null, 1));
    },
  });

  const [descCode, setDescCode] = useState('');
  const isFormValid = formik.isValid && Object.values(formik.values).filter((v) => v !== '').length !== 0;
  console.log(isFormValid);
  console.log(Object.values(formik.values).filter((v) => v !== '').length);

  return (
    <MainTemplate>
      <AdminPageWrapper>
        <h5>Categories</h5>
        <br />
        <div style={{ position: 'relative', height: 'auto' }}>
          <form onSubmit={formik.handleSubmit} style={{ position: 'relative' }}>
            <FormikInput
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Tytuł"
              labelIcon={['fas', 'quote-right']}
              value={formik.values.title.trimStart()}
              touched={formik.touched.title}
              errors={formik.errors.title}
              placeholder="Wpisz tytuł"
            />
            <FormikInput
              type="text"
              name="test"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Tytuł 33"
              labelIcon={['fas', 'quote-right']}
              value={formik.values.test}
              touched={formik.touched.test}
              errors={formik.errors.test}
              placeholder="Wpisz tytuł"
            />
            {isFormValid && (
              <Button type="submit" label="submit" btnSmall btnOutline btnColor="light" />
            )}
          </form>
          <Codemirror setStateFunc={setDescCode} />
        </div>
      </AdminPageWrapper>
    </MainTemplate>
  );
};

export default AdminCategories;
// TODO refcrot
