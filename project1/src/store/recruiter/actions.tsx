import Router from 'next/router';

import { RecruiterData } from '../../types';
import { getCookie, setCookie, removeCookie } from '../../auth/cookie';
import { API_FETCH_RECRUITER_LIST, API_FETCH_RECRUITER_COUNT } from '../../auth/apiRoutes';

// actionTypes
export const authActionTypes = {
  FETCH_RECRUITER_LIST: "FETCH_RECRUITER_LIST",
  FETCH_RECRUITER_COUNT: "FETCH_RECRUITER_COUNT",
  API_SUCCESS: 'API_SUCCESS',
  API_FAILURE: 'API_FAILURE',
};

const RECRUITERS_LIST = (data:any) => {
  return {
    type: authActionTypes.FETCH_RECRUITER_LIST,
    payload: data
  };
};

const RECRUITERS_COUNT = (data: any) => {
  return {
    type: authActionTypes.FETCH_RECRUITER_COUNT,
    payload: data
  };
};

const API_SUCCESS = (msg: any) => {
  return {
    type: authActionTypes.API_SUCCESS,
    payload: msg
  };
};

const API_FAILURE = (error: any) => {
  return {
    type: authActionTypes.API_FAILURE,
    payload: error
  };
};

// fetch recruiters list from server
export const fetchRecruitersList = () => {
  //let authToken = getCookie('aaInvestAuthToken')
  console.log('fetching recruiters list from server')
  return (dispatch: any) => {
    API_FETCH_RECRUITER_LIST()
      .then((res:any) => {
        console.log(res)
        if (res.ok) {
          return res.json()
            .then((data:any) => {
              console.log(data)
              if (data?.api) {
                if (data.api?.responseCode === 1006) {
                  console.log('recruiters list fetched successfully');
                  dispatch(RECRUITERS_LIST(data.object));
                  dispatch(API_SUCCESS('DONE'));
                }
              }
              else {
                console.log('error!');
                dispatch(API_FAILURE('ERROR'));
              }
            })
        } else { // server error - 5xx
          console.log('server error');
          dispatch(API_FAILURE('SERVER_ERROR'));
        }
      })
      .catch((err:any) => {
        console.log(err);
        dispatch(API_FAILURE('API_ERROR'));
      });
  }
};

// fetch recruiters count from server
export const fetchRecruitersCount = () => {
  //let authToken = getCookie('aaInvestAuthToken')
  console.log('fetching recruiters count from server')
  return (dispatch: any) => {
    API_FETCH_RECRUITER_COUNT()
      .then((res:any) => {
        console.log(res)
        if (res.ok) {
          return res.json()
            .then((data:any) => {
              console.log(data)
              if (data?.num_of_recruiters) {
                dispatch(RECRUITERS_COUNT(data.num_of_recruiters));
                dispatch(API_SUCCESS('DONE'));
              }
              else {
                console.log('error!');
                dispatch(API_FAILURE('ERROR'));
              }
            })
        } else { // server error - 5xx
          console.log('server error');
          dispatch(API_FAILURE('SERVER_ERROR'));
        }
      })
      .catch((err:any) => {
        console.log(err);
        dispatch(API_FAILURE('API_ERROR'));
      });
  }
};