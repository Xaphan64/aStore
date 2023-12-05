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
<<<<<<< Updated upstream
  const [data, setData] = useState(null);
=======

  const [data, setData] = useState([]);
>>>>>>> Stashed changes
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // STATE CONSTANTS

  // LIFE CYCLE

  useEffect(() => {
<<<<<<< Updated upstream
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
=======
    const currentPage = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

    if (currentPage === "add-product") {
      setIsLoading(false);
      return;
    }

    axios
      .get(url)
      .then((response) => {
>>>>>>> Stashed changes
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
    setData,
  };
};
