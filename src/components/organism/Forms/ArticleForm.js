import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useFormik } from 'formik';
import { AuthContext, PageContext } from 'context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { articlePagePhrazes } from 'languages/articlePagePhrazes';
import { commonPhrazes } from 'languages/commonPhrazes';
import { device } from 'themes/commonElements/mediaBreakpoints';
import { useAxios } from 'hooks/useAxios';
import FormikInput from 'components/molecules/FormikInput/FormikInput';
import FormikSelect from 'components/molecules/FormikSelect/FormikSelect';
import InlineSwitcher from 'components/molecules/InlineSwitcher/InlineSwitcher';
import Spinner from 'components/atoms/Spinner/Spinner';
import CodemirrorTab from 'components/molecules/CodemirrorTab/CodemirrorTab';
import Button from 'components/atoms/Button/Button';
import Divider from 'components/atoms/Divider/Divider';
import ErrorBox from 'components/molecules/ErrorBox/ErrorBox';

const StyleTitlesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  > div {
    display: block;
    width: 50%;
    @media ${device.max.tablet} {
      width: 100%;
    }
  }

  @media ${device.max.tablet} {
    flex-direction: column;
  }
`;

const StyledSerieCotrollWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  & > div:nth-of-type(1) {
    flex-grow: 1.8;
  }
  & > div:nth-of-type(2) {
    max-width: 150px;
  }
`;

const StyledEditorWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-grow: 3;
  margin-top: 50px;
  align-content: center;
  align-items: start;
  justify-items: center;
  justify-content: center;
`;

const StyledCotrolsWrapper = styled.div`
  flex-grow: 0.1;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  align-items: center;
  justify-content: space-between;
  & > div {
    width: 100%;
  }
`;
const StyledCodemirrorWrapper = styled.div`
  flex-grow: 2.9;
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

const ArticleForm = () => {
  const { push } = useHistory();
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);
  const iteoptionItems = [
    { value: 'category', label: commonPhrazes[lang].category },
    { value: 'serie', label: commonPhrazes[lang].serie },
  ];

  const [isLoading, setIsLoadig] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [articleId, setArticleId] = useState();
  const [articleData, setArticleData] = useState();
  const [articleContentPl, setArticleContentPl] = useState('\n\n\n\n\n');
  const [articleContentEn, setArticleContentEn] = useState('\n\n\n\n\n');

  const [series, setSeries] = useState([]);
  const [seriesLength, setSeriesLength] = useState([]);
  const [categories, setCategories] = useState();
  const [categoriesLength, setcategoriesLength] = useState();

  // general function for transform fetched data to select option object
  const filterArticleTypes = (dataObj, typeType, setState) => {
    let result = [];
    result = dataObj.reduce((acc, { _id, name, type }) => {
      type === typeType && acc.push({ value: _id, label: name });
      return acc;
    }, []);
    setState(result);
  };

  // getting data with useAxios hook
  useEffect(() => {
    setIsLoadig(true);
    if (aid) {
      axios
        .all([axios.get(`/article/${aid}`), axios.get('/article-type/enabled')])
        .then((response) => {
          console.log(response[1]);
          filterArticleTypes(response[1].data, 'serie', setSeries);
          filterArticleTypes(response[1].data, 'category', setCategories);
          setArticleId(response[0].data._id);
          formik.setFieldValue('isEnabled', response[0].data.isEnabled);
          formik.setFieldValue('titlePl', response[0].data.title.pl);
          formik.setFieldValue('titleEn', response[0].data.title.en);
          formik.setFieldValue('type', response[0].data.articleType.type);
          response[0].data.articleType.type === 'category'
            && formik.setFieldValue('category', response[0].data.articleType._id);
          response[0].data.articleType.type === 'serie'
            && formik.setFieldValue('serie', response[0].data.articleType._id);
          response[0].data.articleType.type === 'serie'
            && formik.setFieldValue('seriePart', response[0].data.seriePart);
          setArticleContentPl(response[0].data.content.pl);
          setArticleContentEn(response[0].data.content.en);
          setIsLoadig(false);
        })
        .catch((err) => {
          if (err) {
            setError(err.response.status || 'Something went wrong!');
            console.log(err.response.status);
            setIsLoadig(false);
          }
        });
    } else {
      axios.get('/article-type/enabled').then((response) => {
        console.log(response);
        filterArticleTypes(response.data, 'serie', setSeries);
        filterArticleTypes(response.data, 'category', setCategories);
        setIsLoadig(false);
      });
    }
  }, []);

  // set states for select fields controll
  useEffect(() => {
    series && setSeriesLength(series.length);
    categories && setcategoriesLength(categories.length);
  }, [series, categories]);

  const typeChangeResetHandler = (e) => {
    formik.setFieldValue('serie', '', false);
    formik.setFieldValue('seriePart', '', false);
    formik.setFieldValue('category', '', false);
    formik.setFieldValue('type', e.target.value, false);
  };

  const { sendRequest: getArticleWhenAID } = useAxios();
  const { aid } = useParams();
  useEffect(() => {
    aid && getArticleWhenAID({ url: `/article/${aid}` }, setArticleData);
  }, []);

  const formik = useFormik({
    initialValues: {
      titlePl: '',
      titleEn: articleData ? articleData.title.en : '',
      isEnabled: null,
      type: '',
      serie: '',
      category: '',
      seriePart: '',
    },
    validationSchema: Yup.object({
      titlePl: Yup.string()
        .trim()
        .min(3, `${commonPhrazes[lang].min} 3 ${commonPhrazes[lang].characters}`)
        .max(150, `${commonPhrazes[lang].max} 150${commonPhrazes[lang].characters}`)
        .required(commonPhrazes[lang].fieldRequired),
      type: Yup.string().required(commonPhrazes[lang].fieldRequired),
      serie: Yup.string().when('type', {
        is: 'serie',
        then: Yup.string().required(commonPhrazes[lang].fieldRequired),
      }),
      category: Yup.string().when('type', {
        is: 'category',
        then: Yup.string().required(commonPhrazes[lang].fieldRequired),
      }),
      seriePart: Yup.number().when('type', {
        is: 'serie',
        then: Yup.number().required(commonPhrazes[lang].fieldRequired),
      }),
    }),

    onSubmit: (values) => {
      setIsSubmitted(formik.isValid && formik.isSubmitting);
    },
  });

  const method = articleId ? 'PUT' : 'POST';
  const url = articleId ? `/article/${articleId}` : '/article';
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` };
  const body = {
    title: { pl: formik.values.titlePl, en: formik.values.titleEn },
    articleType: formik.values.category ? formik.values.category : formik.values.serie,
    seriePart: formik.values.serie ? formik.values.seriePart : null,
    content: { pl: articleContentPl, en: articleContentEn },
    creator: auth.userId,
    modifiedAt: new Date(Date.now()).toISOString(),
    isEnabled: formik.values.isEnabled,
  };

  useEffect(() => {
    isSubmitted
      && axios({
        method,
        url,
        headers,
        data: body,
      })
        .then((response) => {
          setIsSaving(true);
          console.log(response);
          setArticleId(response.data._id);
          response.status === 201
            && toast.success(commonPhrazes[lang].createdItem, { autoClose: 3500 });
          response.status === 200
            && toast.success(commonPhrazes[lang].savedData, { autoClose: 3500 });
          setTimeout(() => {
            setIsSaving(false);
          }, 500);
        })
        .catch((err) => {
          if (err) {
            setIsSaving(true);
            setError(err.response.status || 'Something went wrong!');
            console.log(err.response.status);
            setIsSaving(false);
          }
        });
    setIsSubmitted(false);
  }, [isSubmitted]);

  return (
    <>
      {(isLoading || isSaving) && (
        <Spinner text={isLoading ? commonPhrazes[lang].loading : commonPhrazes[lang].saving} />
      )}
      {error && <ErrorBox fontLarge errorCode={error} />}
      {!isLoading && !error && !isSaving && (
        <form onSubmit={formik.handleSubmit} className="fadeIn" style={{ position: 'relative' }}>
          <StyleTitlesWrapper>
            <FormikInput
              type="text"
              name="titlePl"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={articlePagePhrazes[lang].titlePl}
              value={formik.values.titlePl.trimStart()}
              touched={formik.touched.titlePl}
              errors={formik.errors.titlePl}
              placeholder={articlePagePhrazes[lang].enterTitlePl}
            />
            <FormikInput
              type="text"
              name="titleEn"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={articlePagePhrazes[lang].titleEn}
              value={formik.values.titleEn.trimStart()}
              touched={formik.touched.titleEn}
              errors={formik.errors.titleEn}
              placeholder={articlePagePhrazes[lang].enterTitleEn}
            />
          </StyleTitlesWrapper>
          <Divider />
          <StyledEditorWrapper>
            <StyledCotrolsWrapper>
              <FormikSelect
                name="type"
                label={articlePagePhrazes[lang].type}
                optionItems={iteoptionItems}
                onChange={typeChangeResetHandler}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                touched={formik.touched.type}
                errors={formik.errors.type}
                placeholder={articlePagePhrazes[lang].chooseType}
              />
              {series
                && formik.values.type === 'serie'
                && (seriesLength > 0 ? (
                  <StyledSerieCotrollWrapper className="serie">
                    <FormikSelect
                      name="serie"
                      label={articlePagePhrazes[lang].chooseSerie}
                      optionItems={series}
                      placeholder={articlePagePhrazes[lang].chooseSerie}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.serie}
                      touched={formik.touched.serie}
                      errors={formik.errors.serie}
                    />
                    <FormikInput
                      type="number"
                      name="seriePart"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label={articlePagePhrazes[lang].seriePart}
                      value={formik.values.seriePart}
                      touched={formik.touched.seriePart}
                      errors={formik.errors.seriePart}
                    />
                  </StyledSerieCotrollWrapper>
                ) : (
                  <ErrorBox fontSmall>{articlePagePhrazes[lang].noSeriesYet}</ErrorBox>
                ))}

              {categories
                && formik.values.type === 'category'
                && (categoriesLength > 0 ? (
                  <FormikSelect
                    name="category"
                    label={articlePagePhrazes[lang].chooseCategory}
                    optionItems={categories}
                    placeholder={articlePagePhrazes[lang].chooseCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    touched={formik.touched.category}
                    errors={formik.errors.category}
                    disabled
                  />
                ) : (
                  <ErrorBox fontSmall>{articlePagePhrazes[lang].noCategoriesYet}</ErrorBox>
                ))}
              <Divider style={{ margin: '20px 0' }} />
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
              <Divider style={{ margin: '20px 0' }} />
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
            </StyledCotrolsWrapper>

            <StyledCodemirrorWrapper>
              <CodemirrorTab
                labelFirst={articlePagePhrazes[lang].descriptionPL}
                labelSecond={articlePagePhrazes[lang].descriptionEN}
                titleFirst={articlePagePhrazes[lang].descriptionPL}
                titleSecond={articlePagePhrazes[lang].descriptionEN}
                codeValueFirst={articleContentPl}
                codeValueSecond={articleContentEn}
                setStateFuncFirst={setArticleContentPl}
                setStateFuncSecond={setArticleContentEn}
              />
            </StyledCodemirrorWrapper>
          </StyledEditorWrapper>
        </form>
      )}
    </>
  );
};

export default ArticleForm;
