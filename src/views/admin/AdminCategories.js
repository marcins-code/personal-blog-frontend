/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Button from 'components/atoms/Button/Button';
import * as Yup from 'yup';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import Codemirror from 'components/atoms/Codemirror/Codemirror';
import MainTemplate from 'templates/MainTemplate';
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import FormikSelect from 'components/molecules/FormikSelect/FormikSelect';
import styled from 'styled-components';
import { useApi } from 'hooks/useAPI';
import Spinner from 'components/molecules/Spinner/Spinner';

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: static;
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [typID, setTypeID] = useState();
  const formik = useFormik({
    initialValues: {
      titlePL: '',
      titleEN: '',
      type: '',
    },

    validationSchema: Yup.object({
      titlePL: Yup.string()
        .trim()
        .min(3, 'Minimal length 3 char')
        .max(15, 'Max length 15')
        .required('Pole wymagane'),
      titleEN: Yup.string()
        .trim()
        .min(3, 'Minimal length 3 char')
        .max(15, 'Max length 15')
        .required('Pole wymagane'),
      type: Yup.string().required('Pole wymagane'),
    }),
    onSubmit: (values) => {
      setIsSubmitted(formik.isValid && formik.isSubmitting);
    },
  });

  const [descCode, setDescCode] = useState('');

  const body = JSON.stringify({
    ...formik.values,
    creator: '60640e5697c82cc7ff14c9ec',
    descriptionPL: descCode,
  });

  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const url = !typID ? `${baseUrl}/article-type` : `${baseUrl}/article-type/${typID}`;

  const method = !typID ? 'POST' : 'PUT';

  const {
    isLoading, resultData, status, error, statusOK, resultDataID,
  } = useApi(
    url,
    method,
    body,
    isSubmitted,
    setIsSubmitted,
  );
  useEffect(() => {
    setTypeID(resultDataID);
  });

  console.log(status);
  console.log(statusOK);
  console.log(resultData);
  console.log(error);
  console.log(resultDataID);
  return (
    <MainTemplate>
      {isLoading && <Spinner />}
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

// eslint-disable-next-line no-unused-vars
// TODO refcrot
