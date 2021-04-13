/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
import React, {
  useContext, useState, useEffect, useCallback, useReducer,
} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext, PageContext } from 'context';
import { commonPhrazes } from 'languages/commonPhrazes';
import { glossaryPagePhrazes } from 'languages/glossaryPagePhrazes';
import { useNotification } from 'hooks/useNotification';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import Button from 'components/atoms/Button/Button';
import Divider from 'components/atoms/Divider/Divider';
import Link from 'components/atoms/Link/Link';
import CodemirrorTab from 'components/molecules/CodemirrorTab/CodemirrorTab';
import Spinner from 'components/atoms/Spinner/Spinner';
import ErrorBox from 'components/molecules/ErrorBox/ErrorBox';
import axios from 'axios';

const StyledInputsWrapper = styled.div`
  display: flex;
  flex-basis: 100px;
  flex-flow: row wrap;
  justify-content: space-evenly;
  padding: 0 70px 0 30px;
  & > div:nth-of-type(1) {
    flex-shrink: 0.5;
  }
  & > div:nth-of-type(2) {
    flex-grow: 2;
  }
  & > div:nth-of-type(3) {
    flex-shrink: 0.5;
  }
`;

const StyledEditorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const GlossaryForm = (props) => {
  const { gid } = useParams();
  console.log(gid);
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);
  const { addErrorNotification, addSuccessNotification } = useNotification();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [entryId, setEntryId] = useState();
  const [descriptionPL, setDescriptionPL] = useState('dupa');
  const [descriptionEN, setDescriptionEN] = useState('dupa');
  const [isLoading, setIsLoadnig] = useState(false);
  const [isError, setIsError] = useState(false);

  const axiosOptions = { headers: { Authorization: `Bearer ${auth.token}` } };

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
          setDescriptionPL(response.data.description.pl);
          setDescriptionEN(response.data.description.en);
          setIsLoadnig(false);
        })
        .catch((error) => {
          console.log(error.response);
          setIsError(error.response.status);
          setIsLoadnig(false);
        });
    }
  }, []);

  const clickHandler = useCallback((e) => {
    console.log(e.target.checked);
  });

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  console.log(entryId);
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
  const body = {
    ...formik.values,
    creator: auth.userId,
    description: {
      pl: descriptionPL,
      en: descriptionEN,
    },
  };
  console.log(entryId);

  useEffect(() => {
    if (isSubmitted && !entryId) {
      axios
        .post('/glossary', body, axiosOptions)
        .then((response) => {
          setIsSubmitted(false);
          setEntryId(response.data._id);
          response.status === 201 && addSuccessNotification(commonPhrazes[lang].createdItem);
          console.log(response);
        })
        .catch((error) => {
          if (error.response) {
            setIsSubmitted(false);
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
    if (isSubmitted && entryId) {
      axios
        .put(`/glossary/${entryId}`, body, axiosOptions)
        .then((response) => {
          setIsSubmitted(false);
          console.log(response);
          response.status === 200 && addSuccessNotification(commonPhrazes[lang].savedData);
          // response.statusText !== 'OK' && addErrorNotification(response.data.message);
        })
        .catch((error, response) => {
          if (error.response) {
            setIsSubmitted(false);
            console.log(error.response);
          }
        });
    }
  }, [isSubmitted]);

  return (
    <>
      {isLoading && !isSubmitted && <Spinner text={commonPhrazes[lang].loading} />}
      {isError && <ErrorBox errorCode={isError} />}
      {!isLoading && !isError && (
        <div className="fadeIn">
          <form
            onSubmit={formik.handleSubmit}
            style={{ position: 'relative', display: 'flex-block' }}
          >
            <StyledInputsWrapper className="inputs-wrapper">
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
                onClick={forceUpdate}
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

                <Link as={NavLink} to="/admin/glossary">
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
