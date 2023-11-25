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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // STATE CONSTANTS

  // LIFE CYCLE

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  // EVENT HANDLERS

  return {
    data,
    setData,
    isLoading,
    error,
  };
};
