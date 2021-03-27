import { useState, useEffect } from 'react';

export const useApi = (url, method = 'GET', body = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    setIsLoading(true);
    // const addHeaders = new Headers();
    // addHeaders.append(headers)
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body,
        });
        const resData = await res.json();
        console.log(resData);

        if (resData) {
          setTimeout(() => {
            setData(resData);
            setStatus(res.status);
            setIsLoading(false);
          }, 1000);
        }
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    // fetchData()

    return fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    error,
    data,
    status,
  };
};
