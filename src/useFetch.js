import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    setTimeout(() => {
      axios.get(url, { cancelToken: source.token })
        .then(response => {
          setIsPending(false);
          setData(response.data);
          setError(null);
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            console.log('axios request canceled');
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    // Cleanup function to cancel the request
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [url]);

  return { data, isPending, error };
}

export default useFetch;
