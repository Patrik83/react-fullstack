import { useState, useEffect } from "react";
import axios from "axios";

const useApi = (url, method) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(url, method)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoaded(true));
  }, [url, method]);

  return { data, error, loaded };
};

export default useApi;