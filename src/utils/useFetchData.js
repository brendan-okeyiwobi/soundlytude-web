// src/hooks/useDataFetcher.js
import { useState, useCallback } from "react";
import { fetchData } from "../utils/fetchData";

export function useDataFetcher(initialUrl = null, insertType = "") {
  const [data, setData] = useState(null);
  const [resultCount, setResultCount] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const loadData = useCallback(async (url = initialUrl, method = "GET", body = null) => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsDone(false);
    setResultCount(-1);

    try {
      const result = await fetchData(url, method, body);

      const isArray = Array.isArray(result);
      setResultCount(isArray ? result.length : -1);

      if (insertType === "data+" && Array.isArray(data)) {
        setData([...data, ...result]);
      } else {
        setData(result);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      setIsDone(true);
    }
  }, [data, insertType, initialUrl]);

  return {
    data,
    resultCount,
    errorMessage,
    isLoading,
    isDone,
    loadData,
  };
}
