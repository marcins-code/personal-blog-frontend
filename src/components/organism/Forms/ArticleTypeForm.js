/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { AuthContext, PageContext } from 'context';
import { articleTypesPagePhrazes } from 'languages/articleTypesPagePhrazes';
import { commonPhrazes } from 'languages/commonPhrazes';
import { useNotification } from 'hooks/useNotification';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import FormikSelect from 'components/molecules/FormikSelect/FormikSelect';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import Link from 'components/atoms/Link/Link';
import Spinner from 'components/atoms/Spinner/Spinner';
import CodemirrorTab from 'components/molecules/CodemirrorTab/CodemirrorTab';
import Button from 'components/atoms/Button/Button';
import Divider from 'components/atoms/Divider/Divider';
import ErrorBox from 'components/molecules/ErrorBox/ErrorBox';

const StyledFormWrapper = styled.div``;

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 70px 0 30px;
`;

const StyledEditorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const StyledCodemirrorWrapper = styled.div`
  flex-grow: 5;
`;

const StyledButtonsWrapper = styled.div`
  max-width: 81px;
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  align-content: space-around;
  margin-right: 50px;
  > button {
    margin-bottom: 20px;
  }
`;

const ArticleTypeForm = () => {
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);
  const { addErrorNotification, addSuccessNotification } = useNotification();
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const iteoptionItems = [
    { value: 'category', label: commonPhrazes[lang].category },
    { value: 'serie', label: commonPhrazes[lang].serie },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isEn, setIsEn] = useState();
  const [articleTypeId, setaAticleTypeId] = useState();
  const [isLoading, setIsLoadnig] = useState(false);
  const [descriptionPL, setDescriptionPL] = useState('dupa');
  const [descriptionEN, setDescriptionEN] = useState('dupa');

  const { atid } = useParams();

  useEffect(() => {
    if (atid) {
      const fetchData = async () => {
        try {
          setIsLoadnig(true);
          const response = await fetch(`${baseUrl}/article-type/${atid}`);
          const responseData = await response.json();
          if (response.ok) {
            setaAticleTypeId(atid);
            formik.setFieldValue('name', responseData.name, false);
            formik.setFieldValue('type', responseData.type, false);
            formik.setFieldValue('icon', responseData.icon, false);
            formik.setFieldValue('isEnabled', responseData.isEnabled);
            // switchOn.current = responseData.isEnabled;
            setDescriptionPL(responseData.description.pl);
            setDescriptionEN(responseData.description.en);
            setIsLoadnig(false);
          } else {
            setIsError({ status: response.status, message: responseData.message });
            setIsLoadnig(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  // switchOn.current = true;

  const formik = useFormik({
    initialValues: {
      name: '',
      isEnabled: null,
      icon: '',
      type: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(3, `${commonPhrazes[lang].min} 3 ${commonPhrazes[lang].characters}`)
        .max(15, `${commonPhrazes[lang].max} 15 ${commonPhrazes[lang].characters}`)
        .required(commonPhrazes[lang].fieldRequired),
      icon: Yup.string()
        .trim()
        .min(3, `${commonPhrazes[lang].min} 3 ${commonPhrazes[lang].characters}`)
        .max(15, `${commonPhrazes[lang].max} 15 ${commonPhrazes[lang].characters}`)
        .required(commonPhrazes[lang].fieldRequired),
      type: Yup.string().required(commonPhrazes[lang].fieldRequired),
    }),
    onSubmit: (values) => {
      setIsSubmitted(formik.isValid && formik.isSubmitting);
    },
  });
  const method = articleTypeId ? 'PUT' : 'POST';
  const url = articleTypeId
    ? `${baseUrl}/article-type/${articleTypeId}`
    : `${baseUrl}/article-type`;
  const body = JSON.stringify({
    ...formik.values,
    creator: auth.userId,
    description: {
      pl: descriptionPL,
      en: descriptionEN,
    },
  });
  const authHeaders = new Headers();
  authHeaders.append('Content-Type', 'application/json');
  authHeaders.append('Authorization', `Bearer ${auth.token}`);
  useEffect(() => {
    if (isSubmitted) {
      const fetchData = async () => {
        try {
          const response = await fetch(url, { method, headers: authHeaders, body });
          const responseData = await response.json();
          setaAticleTypeId(responseData._id);
          setIsSubmitted(false);

          if (response.ok) {
            response.status === 200 && addSuccessNotification(commonPhrazes[lang].savedData);
            response.status === 201 && addSuccessNotification(commonPhrazes[lang].createdItem);
          }

          if (!response.ok) {
            addErrorNotification(responseData.message);
          }
        } catch (error) {
          addErrorNotification(error.message);
        }
      };

      fetchData();
    }
  }, [isSubmitted]);

  return (
    <>
      {isLoading && !isSubmitted && <Spinner text={commonPhrazes[lang].loading} />}
      {isError && <ErrorBox errorCode={isError.status} />}
      {!isLoading && !isError && (
        <StyledFormWrapper className="fadeIn">
          <form onSubmit={formik.handleSubmit} style={{ position: 'relative' }}>
            <StyledInputsWrapper>
              <FormikInput
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={articleTypesPagePhrazes[lang].name}
                value={formik.values.name.trimStart()}
                touched={formik.touched.name}
                errors={formik.errors.name}
                placeholder={articleTypesPagePhrazes[lang].enterName}
              />
              <FormikInput
                type="text"
                name="icon"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={articleTypesPagePhrazes[lang].icon}
                value={formik.values.icon.trimStart()}
                touched={formik.touched.icon}
                errors={formik.errors.icon}
                placeholder={articleTypesPagePhrazes[lang].addIcon}
              />
              <FormikSelect
                name="type"
                label={articleTypesPagePhrazes[lang].type}
                optionItems={iteoptionItems}
                placeholder={commonPhrazes[lang].choose}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                touched={formik.touched.type}
                errors={formik.errors.type}
              />
              <InlineSwitcher
                isChecked={formik.values.isEnabled}
                change={formik.handleChange}
                switchColor="green"
                notCheckedColor="red"
                label={commonPhrazes[lang].published}
                labelBefore={commonPhrazes[lang].no}
                labelAfter={commonPhrazes[lang].yes}
                switchName="isEnabled"
              />
            </StyledInputsWrapper>
            <Divider />
            <StyledEditorWrapper>
              <StyledButtonsWrapper>
                <Button
                  type="submit"
                  label={commonPhrazes[lang].save}
                  btnColor="green"
                  labelIcon={['far', 'save']}
                />

                <Link as={NavLink} to="/admin/article-types">
                  <Button
                    type="button"
                    label={commonPhrazes[lang].exit}
                    btnColor="secondary"
                    labelIcon={['fas', 'door-open']}
                  />
                </Link>
              </StyledButtonsWrapper>
              <StyledCodemirrorWrapper>
                <CodemirrorTab
                  labelFirst={articleTypesPagePhrazes[lang].descriptionPL}
                  labelSecond={articleTypesPagePhrazes[lang].descriptionEN}
                  titleFirst={articleTypesPagePhrazes[lang].descriptionPL}
                  titleSecond={articleTypesPagePhrazes[lang].descriptionEN}
                  codeValueFirst={descriptionPL}
                  codeValueSecond={descriptionEN}
                  setStateFuncFirst={setDescriptionPL}
                  setStateFuncSecond={setDescriptionEN}
                />
              </StyledCodemirrorWrapper>
            </StyledEditorWrapper>
          </form>
        </StyledFormWrapper>
      )}
    </>
  );
};

export default ArticleTypeForm;

// TODO refactor useApi, create fading wrapper as separate component
