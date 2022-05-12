import axios from 'axios';
import { API_BASE_URL } from '@env';

const apiBaseURL = `${API_BASE_URL}/api`;

const COMMON_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

// global api axios config
const apiInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
  headers: COMMON_HEADERS,
});

export const setAuthToken = (token) => {
  if (token) {
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiInstance.defaults.headers.common['Authorization'];
  }
};

// if calls made being without auth token
apiInstance.interceptors.request.use(
  req => {
    return req;
    // if (axios.defaults.headers.common["Authorization"]) return req;
    // throw ({ message: "the token is not available" });
  },
  error => {
    return Promise.reject(error);
  },
);

// on response
apiInstance.interceptors.response.use(
  (response) => {
    if(response.headers.token) {
      return {
        ...response.data,
        token: response.headers.token
      }
    }
    return response.data;
  },
  (error) => {
    if (error.response) return Promise.resolve(error.response.data);
    return Promise.reject({
      // error object,
      status: false, // error.response.status
      message: error.message,
      // stack: error.stack,
      isAxiosError: error.isAxiosError,
    });
  },
);

// API Call Defintion
const API_CALL = (
  //API_INSTANCE: any = apiInstance,
  API_ROUTE,
  METHOD = 'GET',
  DATA = null,
  HEADERS = COMMON_HEADERS,
  // AUTHORIZATION = null,
) => {
  const API_OPTIONS = {
    method: METHOD,
    headers: HEADERS,
  };

  if (METHOD === ('PUT' || 'PATCH') && DATA === null) {
    throw new Error(`Please send data for ${API_ROUTE} - ${METHOD} call`);
  }

  if (DATA) API_OPTIONS.data = JSON.stringify(DATA);

  // AUTHORIZATION ? (API_OPTIONS.headers = { ...API_OPTIONS.headers, AUTHORIZATION }) : null;

  return apiInstance({
    url: API_ROUTE,
    ...API_OPTIONS,
  });
};

const apiConfig = {
  apiBaseURL,
  apiInstance,
  setAuthToken,
  COMMON_HEADERS,
  API_CALL,
};

export default apiConfig;
