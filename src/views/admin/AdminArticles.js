/* eslint-disable consistent-return */
import AdminPageWrapper from 'components/atoms/Wrappers/AdminPageWrapper';
import React from 'react';
// import { useHttpClient } from 'hooks/useHttpClient';
// import ErrorModal from 'components/atoms/ErrorModal/ErrorModal';
// import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
// import { useApi } from 'hooks/useAPI';
import MainTemplate from 'templates/MainTemplate';
import AdminNewArticle from './AdminNewArticle';

const AdminArticles = () => {
  // const [loadedArtiles, setLoadedArtiles] = useState();
  const isLoading = false;

  // const {
  //   isLoading, error, data, status,
  // } = useApi('http://localhost:5000/api/article', 'POST', JSON.stringify(body));

  // console.log(data);
  // console.log(error);
  // console.log(status);
  return (
    <MainTemplate>
      <AdminPageWrapper>
        {/* <ErrorModal error={error} onClear={clearError} /> */}
        {isLoading && <div className="center">{/* <LoadingSpinner /> */}</div>}
        {!isLoading && <AdminNewArticle />}
        <pre />
      </AdminPageWrapper>
    </MainTemplate>
  );
};
export default AdminArticles;
