/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
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
// const fetchedDataToSelectOptions = (data, type, typeName, value, labelValue) => {
//   let array = [];
//   array = data.map((item) => {
//     if (item.type === typeName) {
//       return { value: item[value], label: item[labelValue] };
//     }

//     return array;
//   });
// };

const ArticleForm = () => {
  const { push } = useHistory();
  const { lang } = useContext(PageContext);
  const auth = useContext(AuthContext);
  const iteoptionItems = [
    { value: 'category', label: commonPhrazes[lang].category },
    { value: 'serie', label: commonPhrazes[lang].serie },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [articleId, setArticleId] = useState();
  const [articleContentPl, setArticleContentPl] = useState('\n\n\n\n\n');
  const [articleContentEn, setArticleContentEn] = useState('\n\n\n\n\n');

  // get article types data for proper select boxes
  const { isLoading, error, sendRequest: getEanbledArticleTypes } = useAxios();
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
    const dispatchData = (dataObj) => {
      filterArticleTypes(dataObj, 'serie', setSeries);
      filterArticleTypes(dataObj, 'category', setCategories);
    };
    getEanbledArticleTypes({ url: '/article-type/enabled' }, dispatchData);
  }, [getEanbledArticleTypes]);

  // set states for select fields controll
  useEffect(() => {
    series && setSeriesLength(series.length);
    categories && setcategoriesLength(categories.length);
  }, [series, categories]);

  // get articleType
  // const [series, setSeries] = useState([]);
  // const [seriesLength, setSeriesLength] = useState([]);
  // const [categories, setCategories] = useState();
  // const [categoriesLength, setcategoriesLength] = useState();
  // let seriesOptions = [];
  // let categoriesOptions = [];
  // useEffect(() => {
  //   setIsLoadig(true);
  //   axios
  //     .get('/article-type')
  //     .then((response) => response.data)
  //     .then((data) => {
  //       categoriesOptions = data.reduce((acc, { name, type }) => {
  //         type === 'category' && acc.push({ value: name, label: name });
  //         return acc;
  //       }, []);
  //       setCategories(categoriesOptions);
  //       seriesOptions = data.reduce((acc, { name, type }) => {
  //         type === 'serie' && acc.push({ value: name, label: name });
  //         return acc;
  //       }, []);
  //       setSeries(seriesOptions);
  //       setIsLoadig(false);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         setIsLoadig(false);
  //         setIsError(error.response.status);
  //         console.log(error.response);
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   series && setSeriesLength(series.length);
  //   categories && setcategoriesLength(categories.length);
  // }, [series, categories]);

  const typeChangeResetHandler = (e) => {
    formik.setFieldValue('serie', '', false);
    formik.setFieldValue('seriePart', '', false);
    formik.setFieldValue('category', '', false);
    formik.setFieldValue('type', e.target.value, false);
  };

  // const { atid } = useParams();

  // get data is atid is in params
  // useEffect(() => {
  //   if (atid) {
  //     setIsLoadig(true);
  //     axios
  //       .get(`/article-type/${atid}`)
  //       .then((response) => {
  //         setaAticleTypeId(response.data._id);
  //         formik.setFieldValue('name', response.data.name, false);
  //         formik.setFieldValue('type', response.data.type, false);
  //         formik.setFieldValue('icon', response.data.icon, false);
  //         formik.setFieldValue('isEnabled', response.data.isEnabled);
  //         // setDescriptionPL(response.data.description.pl);
  //         // setDescriptionEN(response.data.description.en);
  //         setIsLoadig(false);
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           setIsSubmitted(false);
  //           setIsError(error.response.status);
  //         }
  //       });
  //   }
  // }, []);

  const formik = useFormik({
    initialValues: {
      titlePl: '',
      titleEn: '',
      isEnabled: null,
      icon: '',
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
      seriePart: Yup.string().when('type', {
        is: 'serie',
        then: Yup.string().required(commonPhrazes[lang].fieldRequired),
      }),
    }),

    onSubmit: (values) => {
      setIsSubmitted(formik.isValid && formik.isSubmitting);
    },
  });

  const method = articleId ? 'PUT' : 'POST';
  const url = articleId ? `/article/${articleId._id}` : '/article';
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

  const { sendRequest: createSaveArtcile } = useAxios();

  useEffect(() => {
    isSubmitted
      && createSaveArtcile(
        {
          url,
          method,
          headers,
          body,
        },
        setArticleId,
      );
    setIsSubmitted(false);
  }, [createSaveArtcile, isSubmitted]);

  console.log(articleId);

  // useEffect(() => {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${auth.token}`,
  //   };
  //   if (isSubmitted) {
  //     axios({
  //       method,
  //       url,
  //       data,
  //       headers,
  //     })
  //       .then((response) => {
  //         response.status === 200
  //           && toast.success(commonPhrazes[lang].savedData, { autoClose: 2500 });
  //         if (response.status === 201) {
  //           setaAticleTypeId(response.data._id);
  //           toast.success(commonPhrazes[lang].createdItem, { autoClose: 2500 });
  //         }
  //         setIsSubmitted(false);
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);
  //           toast.error(error.response.data.message, { autoClose: 2500 });
  //           setIsSubmitted(false);
  //         }
  //       });
  //   }
  // }, [isSubmitted]);

  return (
    <>
      {/* {isLoading && !isSubmitted && !error && <Spinner text={commonPhrazes[lang].loading} />} */}
      {error && <ErrorBox errorCode={error} />}
      {!isLoading && !error && (
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
                      type="text"
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
