import axios from 'axios';
import { useState, useCallback } from 'react';

export const useAxios = (withAuth) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    console.log(requestConfig.body);

    const ourRequest = axios.CancelToken.source();
    // axios({
    //   method: requestConfig.method,
    //   url: requestConfig.url,
    //   headers: requestConfig.headers,
    //   data: body,
    //   cancelToken: ourRequest.token,
    // })
    axios({
      method: requestConfig.method ? requestConfig.method : 'GET',
      url: requestConfig.url,
      headers: requestConfig.headers ? requestConfig.headers : {},
      data: requestConfig.body ? requestConfig.body : null,
      cancelToken: ourRequest.token,
    })
      .then((response) => response.data)
      .then((data) => {
        applyData(data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message || 'Something went wrong!');
          console.log(err.message);
        }
      });

    setIsLoading(false);
    return () => {
      ourRequest.cancel();
    };
  }, []);

  return { isLoading, error, sendRequest };
};
