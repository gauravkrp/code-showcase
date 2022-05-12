// import { NumberSchemaConstructor } from 'yup';
import axios, { AxiosResponse, AxiosRequest, AxiosError } from 'axios';
import { TypeObject } from 'types';

const apiHost = process.env.API_BASE_URL;
const apiBaseURL = `${apiHost}/api`;

const COMMON_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Accept': '*',
  'Content-Type': 'application/json',
};

// global api axios config
const apiInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
  headers: COMMON_HEADERS,
});

export const setAuthToken = (token: string) => {
  if (token) {
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiInstance.defaults.headers.common['Authorization'];
  }
};

// if calls made being without auth token
apiInstance.interceptors.request.use(
  (req: AxiosRequest) => {
    return req;
    // if (axios.defaults.headers.common["Authorization"]) return req;
    // throw ({ message: "the token is not available" });
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

//on successful response
apiInstance.interceptors.response.use(
  (response: AxiosResponse): TypeObject => {
    const authToken = response.headers['token'];
    if (authToken) {
      setAuthToken(response.headers.token);
      response.data.result.token = authToken;
      return {
        ...response.data,
        token: authToken
      }
    }
    return response.data;
  },
  (error: AxiosError): TypeObject => {
    if (error.response) return Promise.resolve(error.response.data);
    return Promise.reject({
      status: false,
      message: error.message,
      stack: error.stack,
      isAxiosError: error.isAxiosError,
    });
  },
);

// API Call Defintion
const API_CALL = (
  API_ROUTE: string,
  METHOD = 'GET',
  DATA: (object | null) = null,
  MULTIPART = false,
  HEADERS: any = COMMON_HEADERS,
) => {
  const API_OPTIONS: any = {
    method: METHOD,
    headers: {
      ...HEADERS,
      'Content-Type': MULTIPART ? 'multipart/form-data' : 'application/json',
    },
  };

  if (METHOD === ('PUT' || 'PATCH') && DATA === null) {
    throw new Error(`Please send data for ${API_ROUTE} - ${METHOD} call`);
  }

  if (DATA) API_OPTIONS.data = MULTIPART ? DATA : JSON.stringify(DATA);

  return apiInstance({
    url: API_ROUTE,
    ...API_OPTIONS,
  });
};

const API_CONFIG = {
  apiBaseURL,
  apiInstance,
  setAuthToken,
  COMMON_HEADERS,
  API_CALL,
};

export default API_CONFIG;
