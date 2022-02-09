import {useCallback, useState} from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest =  useCallback( async (httpOptions, applyData) => {
      
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          httpOptions.url,{
              method: httpOptions.method ? httpOptions.method : 'GET',
              headers: httpOptions.headers ? httpOptions.headers : {},
              body: httpOptions.body ? JSON.stringify(httpOptions.body) : null
          }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
        applyData(data);

      } catch (err) {
        console.warn(err);
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, []);

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    }
};

export default useHttp;