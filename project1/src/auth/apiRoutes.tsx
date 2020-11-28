// import { NumberSchemaConstructor } from 'yup';
import { UserLoginData, RecruiterData } from '../types';

const apiHost = process.env.API_BASE_URL;
export const apiBaseURL = `${apiHost}`;
export const apiBaseURL_Recruiter = `${apiBaseURL}/recruiter-profile`;

export const COMMON_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Accept": "application/json",
  "Content-Type": "application/json",
};

// API Call Defintion
export const API_CALL = (
    API_ROUTE: string,
    METHOD: string = "GET",
    DATA: any = null,
    HEADERS: any = COMMON_HEADERS,
    AUTHORIZATION: any = null
  ) => {
  const API_OPTIONS:any = {
    method: METHOD,
    headers: HEADERS,
  };
  DATA ? API_OPTIONS.body = JSON.stringify(DATA): null;
  AUTHORIZATION ? API_OPTIONS.headers = { ...API_OPTIONS.headers, AUTHORIZATION } : null;
  return fetch(API_ROUTE, API_OPTIONS);
}

// API Routes
export const API_ROUTES = {
  "RECRUITER" : {
    "ADD": `${apiBaseURL_Recruiter}/add`,
    "LIST": `${apiBaseURL_Recruiter}/list`,
    "COUNT": `${apiBaseURL_Recruiter}/count`,
    "DELETE": (recruiter_id: string | number) => `${apiBaseURL_Recruiter}/${recruiter_id}`
  }
};

export default API_ROUTES;

// API CAlls
export const API_ADD_RECRUITER = (data: RecruiterData) => API_CALL(API_ROUTES.RECRUITER.ADD, "POST", { ...data, "logged_by": "Gaurav" });
export const API_DELETE_RECRUITER = (recruiter_id: string | number) => API_CALL(API_ROUTES.RECRUITER.DELETE(recruiter_id), "DELETE");
export const API_FETCH_RECRUITER_LIST = () => API_CALL(API_ROUTES.RECRUITER.LIST);
export const API_FETCH_RECRUITER_COUNT = () => API_CALL(API_ROUTES.RECRUITER.COUNT);