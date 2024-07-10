import { useCallback, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState<object>({});
  const [load, setLoad] = useState<boolean>(false);
  const [erro, setErro] = useState<boolean | string>(false);

  interface Data {
    error?: string,
    message: string,
    statusCode: number,
    access_token: string,
    lifetime?: number
    userData: {
      email: string,
      id: number,
      name: string,
    }
    //boards: object[],
  }

  type returnF<T> = {
    response: Promise<Response>,
    json: T,
  }

  const request = useCallback(async (url: string, options: object): Promise<returnF<Data>> => {
    let response: Response | undefined;
    let json: Data | undefined;

    try {
      setErro(false);
      setLoad(true);

      response = await fetch(url, options);
      json = await response.json();

      if (response.ok === false) {
        if (json && json.message) {
          setErro(json.message)
        }
      }
    } catch (err: any) {
      json = undefined;
      setErro(err.message);
    } finally {
      setData(json ? json : {});
      setLoad(false);

      return { response, json };
    }
  }, []);

  return {
    data,
    load,
    erro,
    request
  }
};

export default useFetch;