/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext, PageContext } from 'context';
import { commonPhrazes } from 'languages/commonPhrazes';
import { glossaryPagePhrazes } from 'languages/glossaryPagePhrazes';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import Button from 'components/atoms/Button/Button';
import Divider from 'components/atoms/Divider/Divider';
import CodemirrorTab from 'components/molecules/CodemirrorTab/CodemirrorTab';
import Spinner from 'components/atoms/Spinner/Spinner';
import ErrorBox from 'components/molecules/ErrorBox/ErrorBox';

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: start;
  & > div:nth-of-type(1) {
    flex-grow: 2;
  }
  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledEditorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`;

const StyledCodemirrorWrapper = styled.div`
  flex-grow: 2;
  margin-left: 30px;
`;

const StyledButtonsWrapper = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0.5;
  > button {
    margin-bottom: 20px;
  }
`;

const GlossaryForm = (props) => {
  const { push } = useHistory();
  const { gid } = useParams();
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [entryId, setEntryId] = useState();
  const [descriptionPL, setDescriptionPL] = useState('');
  const [descriptionEN, setDescriptionEN] = useState('');
  const [isLoading, setIsLoadnig] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (gid) {
      setIsLoadnig(true);
      axios
        .get(`/glossary/${gid}`)
        .then((response) => {
          setEntryId(response.data._id);
          formik.setFieldValue('abbreviation', response.data.abbreviation, false);
          formik.setFieldValue('explication', response.data.explication, false);
          formik.setFieldValue('icon', response.data.icon, false);
          formik.setFieldValue('isEnabled', response.data.isEnabled);
          setDescriptionPL(response.data.description.pl || '');
          setDescriptionEN(response.data.description.en || '');
          setIsLoadnig(false);
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
      abbreviation: '',
      explication: '',
      isEnabled: null,
      icon: '',
    },
    validationSchema: Yup.object({
      abbreviation: Yup.string()
        .trim()
        .min(2, `${commonPhrazes[lang].min} 2 ${commonPhrazes[lang].characters}`)
        .max(25, `${commonPhrazes[lang].max} 25 ${commonPhrazes[lang].characters}`)
        .required(commonPhrazes[lang].fieldRequired),
      explication: Yup.string()
        .trim()
        .min(3, `${commonPhrazes[lang].min} 3 ${commonPhrazes[lang].characters}`)
        .max(250, `${commonPhrazes[lang].max} 250 ${commonPhrazes[lang].characters}`)
        .required(commonPhrazes[lang].fieldRequired),
    }),
    onSubmit: (values) => {
      setIsSubmitted(formik.isValid && formik.isSubmitting);
    },
  });

  const method = entryId ? 'PUT' : 'POST';
  const url = entryId ? `/glossary/${entryId}` : '/glossary';
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
            console.log(response);
            setEntryId(response.data._id);
            toast.success(commonPhrazes[lang].createdItem, { autoClose: 2500 });
          }
          setIsSubmitted(false);
          console.log();
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
        <div className="fadeIn">
          <form
            onSubmit={formik.handleSubmit}
            style={{ position: 'relative', display: 'flex-block' }}
          >
            <StyledInputsWrapper className="inputs-wrapper">
              <div>
                <FormikInput
                  type="text"
                  name="abbreviation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={glossaryPagePhrazes[lang].abbr}
                  value={formik.values.abbreviation.trimStart()}
                  touched={formik.touched.abbreviation}
                  errors={formik.errors.abbreviation}
                  placeholder={glossaryPagePhrazes[lang].enterAbbr}
                />
                <FormikInput
                  type="text"
                  name="explication"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={glossaryPagePhrazes[lang].explication}
                  value={formik.values.explication.trimStart()}
                  touched={formik.touched.explication}
                  errors={formik.errors.explication}
                  placeholder={glossaryPagePhrazes[lang].enterExpl}
                />
              </div>
              <div>
                <FormikInput
                  type="text"
                  name="icon"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={commonPhrazes[lang].icon}
                  value={formik.values.icon.trimStart()}
                  touched={formik.touched.icon}
                  errors={formik.errors.icon}
                  placeholder={glossaryPagePhrazes[lang].addIcon}
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
              </div>
            </StyledInputsWrapper>
            <Divider />
            <StyledEditorWrapper>
              <StyledButtonsWrapper>
                <Button type="submit" btnColor="green" labelIcon={['far', 'save']}>
                  <FontAwesomeIcon icon={['far', 'save']} fixedWidth />
                  {commonPhrazes[lang].save}
                </Button>
                <Button type="button" btnColor="indygo" btnClick={() => push('/admin/glossary')}>
                  <FontAwesomeIcon icon={['fas', 'sign-out-alt']} fixedWidth />
                  {commonPhrazes[lang].close}
                </Button>
              </StyledButtonsWrapper>
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
          </form>
        </div>
      )}
    </>
  );
};

export default GlossaryForm;
