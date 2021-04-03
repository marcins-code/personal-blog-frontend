/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useContext } from 'react';
import { useNotification } from 'hooks/useNotification';
import { AuthContext, PageContext } from 'context';

export const useApi = (url, method = 'GET', body, trigger, setTriggerFunc, withAuth) => {
  const auth = useContext(AuthContext);
  const pageType = useContext(PageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState();
  const [resultDataID, setResultDataID] = useState();
  const [status, setStatus] = useState();
  const [statusOK, setStatusOK] = useState();
  const { addSuccessNotification, addErrorNotification } = useNotification();
  useEffect(() => {
    if (trigger) {
      setIsLoading(true);
      const regHeaders = new Headers();
      regHeaders.append('Content-Type', 'application/json');
      (withAuth || pageType.isAdminPage)
        && regHeaders.append('Authorization', `Bearer ${auth.token}`);
      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            method,
            headers: regHeaders,
            body,
          });
          const responseData = await response.json();
          setStatusOK(response.ok);
          setStatus(response.status);
          if (response.ok) {
            response.status === 200
              && addSuccessNotification('Zapisano dane', `${response.status}`);
            response.status === 201
              && addSuccessNotification('Utworzono nowy zapis', `${response.status}`);
            setResultData(responseData);
          } else {
            setError(responseData);
            addErrorNotification(responseData.message, response.status);
          }
          method !== 'GET' && setResultDataID(responseData._id);
        } catch (err) {
          setError(err);
        }
        setTriggerFunc(false);
        setIsLoading(false);
      };
      return fetchData();
    }
    return null;
  }, [trigger]);

  return {
    isLoading,
    error,
    resultData,
    resultDataID,
    status,
    statusOK,
  };
};
