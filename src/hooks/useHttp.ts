import { useCallback, useEffect, useState } from "react";
import { SERVER_BASE_PATH, TOKEN } from "../constants";

interface Props {
  uri: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  isPublic?: boolean;
  isLazy?: boolean;
}

interface Response<T> {
  loading: boolean;
  errorMessage: string;
  statusCode: number;
  data: T;
  initiateRequest: (reqBody?: any) => Promise<void>;
}

const useHttp = <T>({
  uri,
  method = "GET",
  body = null,
  isPublic = false,
  isLazy = false,
}: Props): Response<T> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [statusCode, setStatusCode] = useState<number>();
  const [errorMessage, setErrorMessage] = useState("");

  const initiateRequest = useCallback(
    async (reqBody: any = null) => {
      setLoading(true);
      setErrorMessage("");
      setData(null);
      setStatusCode(null);

      let headers: any = {
        "Content-Type": "application/json",
      };

      if (!isPublic) {
        if (!sessionStorage.getItem(TOKEN)) {
          setStatusCode(401);
          setErrorMessage("Unauthorized request. Please login!");
          return;
        }

        headers = {
          ...headers,
          Authorization: `Bearer ${sessionStorage.getItem(TOKEN)}`,
        };
      }

      let options: any = {
        method,
        headers,
      };

      if (reqBody || body) {
        options = { ...options, body: JSON.stringify(reqBody || body) };
      }

      const url = `${SERVER_BASE_PATH}${uri}`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        setStatusCode(data.status);
        if (data.status.toString().startsWith("2")) {
          setData(data.body);
        } else {
          setErrorMessage(data.body.message);
        }
      } catch (err) {
        setStatusCode(500);
        setErrorMessage("Unable to make calls to server");
      }
      setLoading(false);
    },
    [uri, body, method, isPublic]
  );

  useEffect(() => {
    if (!isLazy && uri) {
      initiateRequest(null);
    }
  }, [isLazy, uri]);

  return {
    loading,
    errorMessage,
    statusCode,
    data,
    initiateRequest,
  };
};

export default useHttp;
