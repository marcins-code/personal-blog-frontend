/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from 'components/atoms/Button/Button';
import * as Yup from 'yup';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import Codemirror from 'components/atoms/Codemirror/Codemirror';
import MainTemplate from 'templates/MainTemplate';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import FormikSelect from 'components/molecules/FormikSelect/FormikSelect';
import styled from 'styled-components';

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
`;

const iteoptionItems = [
  { value: 'category', label: 'category' },
  { value: 'serie', label: 'series' },
];

const AdminCategories = () => {
  const formik = useFormik({
    initialValues: {
      titlePL: 'dupa',
      titleEN: 'dupa',
      type: '',
    },

    validationSchema: Yup.object({
      titlePL: Yup.string()
        .trim()
        .min(3, 'Minimal length 3 char')
        .max(15, 'Max length 15')
        .required('Pole wymagane'),
      titleEN: Yup.string().trim().max(5, 'i dupa').required('wymagane'),
      type: Yup.string().required('Pole wymagane'),
    }),
    onSubmit: (values) => {
      alert(
        JSON.stringify(
          { ...values, desc: descCode, modifiedAt: new Date().toISOString() },
          null,
          1,
        ),
      );
    },
  });

  const [descCode, setDescCode] = useState('');
  // const isFormValid = formik.isValid
  // && Object.values(formik.values).filter((v) => v !== '').length !== 0;

  return (
    <MainTemplate>
      <AdminPageWrapper>
        <h5>Categories</h5>
        <form onSubmit={formik.handleSubmit} style={{ position: 'relative' }}>
          <StyledFormWrapper>
            <StyledInputsWrapper>
              <FormikInput
                type="text"
                name="titlePL"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Tytuł PL"
                value={formik.values.titlePL.trimStart()}
                touched={formik.touched.titlePL}
                errors={formik.errors.titlePL}
                placeholder="Wpisz tytuł"
              />
              <FormikInput
                type="text"
                name="titleEN"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Tytuł EN"
                value={formik.values.titleEN}
                touched={formik.touched.titleEN}
                errors={formik.errors.titleEN}
                placeholder="Wpisz tytuł"
              />
              <FormikSelect
                name="type"
                label="Typ"
                optionItems={iteoptionItems}
                placeholder="Wybierz"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                touched={formik.touched.type}
                errors={formik.errors.type}
              />

              <Button type="submit" label="submit" btnSmall btnOutline btnColor="light" />
            </StyledInputsWrapper>
            <Codemirror setStateFunc={setDescCode} codeValue={descCode} />
          </StyledFormWrapper>
        </form>
      </AdminPageWrapper>
    </MainTemplate>
  );
};

export default AdminCategories;
// TODO refcrot
