import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { AuthContext, PageContext } from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { articleTypesPagePhrazes } from 'languages/articleTypesPagePhrazes';
import { commonPhrazes } from 'languages/commonPhrazes';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import FormikSelect from 'components/molecules/FormikSelect/FormikSelect';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import Spinner from 'components/atoms/Spinner/Spinner';
import CodemirrorTab from 'components/molecules/CodemirrorTab/CodemirrorTab';
import Button from 'components/atoms/Button/Button';
import Divider from 'components/atoms/Divider/Divider';
import ErrorBox from 'components/molecules/ErrorBox/ErrorBox';

const StyledFormWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  & > div:nth-of-type(1) {
    flex-grow: 0.3;
    justify-items: center;
    align-items: center;
    margin-right: 20px;
  }
  & > div:nth-of-type(2) {
    flex-grow: 3;
  }
`;

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const StyledEditorWrapper = styled.div`
  margin-top: 20px;
`;

const StyledCodemirrorWrapper = styled.div`
  max-width: 830px;
`;

const StyledButtonsWrapper = styled.div`
  max-width: 250px;
  display: flex;
  align-items: start;
  margin: 20px 20px 0 0;
  > button {
    margin-right: 20px;
  }
`;

const StyledControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

  & > div:nth-of-type(2) {
    margin-top: 15px;
  }
`;

const ArticleForm = () => {
  const { push } = useHistory();
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);
  const iteoptionItems = [
    { value: 'category', label: commonPhrazes[lang].category },
    { value: 'serie', label: commonPhrazes[lang].serie },
  ];

  const [isLoading, setIsLoadig] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [articleTypeId, setaAticleTypeId] = useState();
  const [descriptionPL, setDescriptionPL] = useState('\n\n\n\n\n');
  const [descriptionEN, setDescriptionEN] = useState('\n\n\n\n\n');

  const { atid } = useParams();

  // get data is atid is in params
  useEffect(() => {
    if (atid) {
      setIsLoadig(true);
      axios
        .get(`/article-type/${atid}`)
        .then((response) => {
          setaAticleTypeId(response.data._id);
          formik.setFieldValue('name', response.data.name, false);
          formik.setFieldValue('type', response.data.type, false);
          formik.setFieldValue('icon', response.data.icon, false);
          formik.setFieldValue('isEnabled', response.data.isEnabled);
          setDescriptionPL(response.data.description.pl);
          setDescriptionEN(response.data.description.en);
          setIsLoadig(false);
        })
        .catch((error) => {
          if (error.response) {
            setIsSubmitted(false);
            setIsError(error.response.status);
            console.log(error.response);
          }
        });
    }
  }, []);

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
  // saving data pr create new entry
  const method = articleTypeId ? 'PUT' : 'POST';
  const url = articleTypeId ? `/article-type/${articleTypeId}` : '/article-type';
  const data = JSON.stringify({
    ...formik.values,
    creator: auth.userId,
    description: {
      pl: descriptionPL,
      en: descriptionEN,
    },
  });
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.token}`,
    };
    if (isSubmitted) {
      axios({
        method,
        url,
        data,
        headers,
      })
        .then((response) => {
          console.log(response);
          response.status === 200
            && toast.success(commonPhrazes[lang].savedData, { autoClose: 2500 });
          if (response.status === 201) {
            setaAticleTypeId(response.data._id);
            toast.success(commonPhrazes[lang].createdItem, { autoClose: 2500 });
          }
          setIsSubmitted(false);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            toast.error(error.response.data.message, { autoClose: 2500 });
            setIsSubmitted(false);
          }
        });
    }
  }, [isSubmitted]);

  return (
    <>
      {isLoading && !isSubmitted && !isError && <Spinner text={commonPhrazes[lang].loading} />}
      {isError && <ErrorBox errorCode={isError} />}
      {!isLoading && !isError && (
        <form onSubmit={formik.handleSubmit} style={{ position: 'relative' }}>
          <StyledFormWrapper className="fadeIn">
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
              <StyledControlsWrapper>
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
              </StyledControlsWrapper>
              <Divider />
              <StyledButtonsWrapper>
                <Button type="submit" btnColor="green" labelIcon={['far', 'save']}>
                  <FontAwesomeIcon icon={['far', 'save']} fixedWidth />
                  {commonPhrazes[lang].save}
                </Button>
                <Button type="button" btnColor="indygo" btnClick={() => push('/admin/article')}>
                  <FontAwesomeIcon icon={['fas', 'sign-out-alt']} fixedWidth />
                  {commonPhrazes[lang].close}
                </Button>
              </StyledButtonsWrapper>
            </StyledInputsWrapper>
            <StyledEditorWrapper>
              <StyledCodemirrorWrapper>
                <CodemirrorTab
                  labelFirst={commonPhrazes[lang].descriptionPL}
                  labelSecond={commonPhrazes[lang].descriptionEN}
                  titleFirst={commonPhrazes[lang].descriptionPL}
                  titleSecond={commonPhrazes[lang].descriptionEN}
                  codeValueFirst={descriptionPL}
                  codeValueSecond={descriptionEN}
                  setStateFuncFirst={setDescriptionPL}
                  setStateFuncSecond={setDescriptionEN}
                />
              </StyledCodemirrorWrapper>
            </StyledEditorWrapper>
          </StyledFormWrapper>
        </form>
      )}
    </>
  );
};

export default ArticleForm;
