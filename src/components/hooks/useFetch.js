// ASSETS

// STYLES

// LIBRARIES
import { useEffect, useState } from "react";
import axios from "axios";

// MISC

// COMPONENTS

// CONFIGURATION
export const useFetch = (url) => {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRerendering, setIsRerendering] = useState(false);
  const [error, setError] = useState(null);

  // STATE CONSTANTS

  // LIFE CYCLE
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
        setError(false);
        setIsRerendering(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [url, isRerendering]);

  // EVENT HANDLERS
  return {
    data,
    isLoading,
    error,
    setData,
    setIsRerendering,
  };
};
