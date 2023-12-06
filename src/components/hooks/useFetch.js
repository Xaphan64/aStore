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
  const [error, setError] = useState(null);

  // STATE CONSTANTS

  // LIFE CYCLE

  // useEffect(() => {
  //   const currentPage = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

  //   if (currentPage === "add-product") {
  //     setIsLoading(false);
  //     return;
  //   }

  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setData(response.data);
  //       setIsLoading(false);
  //       setError(null);
  //     } catch (error) {
  //       setError(error.message);
  //       setIsLoading(false);
  //     }
  //   })
  //   fetchData();
  // }, [url]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [url]);

  // EVENT HANDLERS

  return {
    data,
    isLoading,
    error,
    setData,
  };
};
