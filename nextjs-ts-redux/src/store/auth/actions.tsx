// import Router from 'next/router';
import { encode } from 'js-base64';
import { removeCookie, setCookie } from 'auth/cookie';
import ApiRoutes from 'api/routes/platform';
import { platformUserLoginData, platformResetPassword, platformOnboardData, TypeObject } from 'types';
import { actionTypeStatus } from '../utility';
import { AppDispatch } from 'store';
// import { AxiosResponse, AxiosPromise, AxiosError } from 'axios';

const apiRoute = new ApiRoutes();

// action types
export const authActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const setAppCookies = (
  token: string,
  platform: Record<string, unknown>,
  user: Record<string, unknown>,
) => {
  setCookie('authToken', token);
  setCookie('myApp_data_platform', encode(JSON.stringify(platform)));
  setCookie('myApp_data_user', encode(JSON.stringify(user)));
};

export default class ReduxActions {
  /**
   * Login Action
   * @param {platformUserLoginData} data
   * */
  static platform_user_login = (data: platformUserLoginData) => (dispatch: AppDispatch): Promise<any> => {
    const actionType = authActionTypes.LOGIN;
    dispatch({
      type: `${actionType}_${actionTypeStatus.REQUEST}`,
    });
    return new Promise((resolve, reject) => {
      apiRoute
        .platform_user_login(data)
        .then((response: TypeObject) => {
          const authToken = response?.result?.token;
          if (authToken) {
            setAppCookies(authToken, response.result.platform, response.result.user);
            dispatch({
              type: `${actionType}_${actionTypeStatus.SUCCESS}`,
              payload: {
                loggedIn: true,
                error: null,
                platform: response.result.platform,
                user: response.result.user,
              },
            });
            resolve({
              code: response?.api?.responseCode,
              message: response.message || '',
              data: response.result || null,
            });
          } else {
            reject(response);
            dispatch({
              type: `${actionType}_${actionTypeStatus.FAILURE}`,
              payload: {
                loggedIn: false,
                error: response.message,
              },
            });
          }
        })
        .catch((error: TypeObject) => {
          reject(error);
          dispatch({
            type: `${actionType}_${actionTypeStatus.FAILURE}`,
            payload: {
              loggedIn: false,
              error: error,
            },
          });
        });
    });
  };

  static platform_user_request_temp_password =
    (mobile_number: number, platform_code: string) => (dispatch: AppDispatch) => {
      const actionType = authActionTypes.LOGIN;
      dispatch({
        type: `${actionType}_${actionTypeStatus.REQUEST}`,
      });
      return new Promise((resolve: any, reject: any) => {
        apiRoute
          .platform_user_request_temp_password(mobile_number, platform_code)
          .then((response: any) => {
            dispatch({
              type: `${actionType}_${actionTypeStatus.SUCCESS}`,
            });
            resolve({
              api: response?.api,
              code: response?.api?.responseCode,
              message: response.message || '',
            });
          })
          .catch((error: any) => {
            dispatch({
              type: `${actionType}_${actionTypeStatus.FAILURE}`,
            });
            reject(error);
          });
      });
    };

  static platform_user_reset_password = (data: platformResetPassword) => (dispatch: AppDispatch) => {
    const actionType = authActionTypes.LOGIN;
    dispatch({
      type: `${actionType}_${actionTypeStatus.REQUEST}`,
    });
    return new Promise((resolve: any, reject: any) => {
      apiRoute
        .platform_user_reset_password(data)
        .then((response: any) => {
          dispatch({
            type: `${actionType}_${actionTypeStatus.SUCCESS}`,
          });
          resolve({
            api: response?.api,
            code: response?.api?.responseCode,
            message: response.message || '',
            result: response.result || null,
          });
        })
        .catch((error: any) => {
          dispatch({
            type: `${actionType}_${actionTypeStatus.FAILURE}`,
          });
          reject(error);
        });
    });
  };

  static platform_onboard = (data: platformOnboardData) => (dispatch: AppDispatch) => {
    const actionType = authActionTypes.LOGIN;
    dispatch({
      type: `${actionType}_${actionTypeStatus.REQUEST}`,
    });
    return new Promise((resolve: any, reject: any) => {
      apiRoute
        .platform_onboard(data)
        .then((response: any) => {
          const authToken = response?.result?.token;
          if (authToken) {
            // setCookie('authToken', authToken);
            setAppCookies(authToken, response.result.platform, response.result.user);
            dispatch({
              type: `${actionType}_${actionTypeStatus.SUCCESS}`,
              payload: {
                loggedIn: true,
                error: null,
                platform: response.result.platform,
                user: response.result.user,
              },
            });
            resolve({
              code: response?.api?.responseCode,
              message: response.message || '',
              data: response.result || null,
            });
          } else {
            reject(response);
            dispatch({
              type: `${actionType}_${actionTypeStatus.FAILURE}`,
              payload: {
                loggedIn: false,
                error: response.message,
              },
            });
          }
        })
        .catch((error: any) => {
          reject(error);
          dispatch({
            type: `${actionType}_${actionTypeStatus.FAILURE}`,
            payload: {
              loggedIn: false,
              error: error,
            },
          });
        });
    });
  };

  static reAuthenticate =
    (token: string, platform: Record<string, unknown>, user: Record<string, unknown>) =>
    (dispatch: AppDispatch) => {
      // console.log('reAuthenticating');
      const actionType = authActionTypes.LOGIN;
      dispatch({
        type: `${actionType}_${actionTypeStatus.REQUEST}`,
      });
      if (token) {
        dispatch({
          type: `${actionType}_${actionTypeStatus.SUCCESS}`,
          payload: {
            loggedIn: true,
            error: null,
            platform,
            user,
          },
        });
      } else {
        dispatch({
          type: `${actionType}_${actionTypeStatus.FAILURE}`,
          payload: {
            loggedIn: false,
            error: `${actionType}_${actionTypeStatus.FAILURE}`,
          },
        });
      }
    };

  static logout = () => (dispatch: AppDispatch) => {
    // Router.push('/login');
    removeCookie('authToken');
    dispatch({
      type: authActionTypes.LOGOUT,
      payload: {
        loggedIn: false,
        error: null,
      },
    });
  };
}
