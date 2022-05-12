export const updateObject = (oldObject: any, updatedValues: any) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const actionTypeStatus = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const asyncAction =
  ({ actionType, actionMethod }: any) =>
  (dispatch: any) => {
    dispatch({
      type: `${actionType}_${actionTypeStatus.REQUEST}`,
    });
    return new Promise((resolve: any, reject: any) => {
      actionMethod
        .then((response: any) => {
          console.log(response);
          if (response.api?.responseCode) {
            dispatch({
              type: `${actionType}_${actionTypeStatus.SUCCESS}`,
            });
            resolve({
              code: response.api.responseCode,
              message: response.message || '',
              data: response.result || null,
            });
          } else {
            reject(response);
            dispatch({
              type: `${actionType}_${actionTypeStatus.FAILURE}`,
            });
          }
        })
        .catch((error: any) => {
          reject(error);
          dispatch({
            type: `${actionType}_${actionTypeStatus.FAILURE}`,
          });
        });
    });
  };

/* const handleAPIErrors = (error: any, dispatch: boolean = true) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    if (dispatch) return (API_FAILURE('SERVER_ERROR'));
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
    if (dispatch) return (API_FAILURE('TIMED_OUT'));
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    if (dispatch) return (API_FAILURE('API_ERROR'));
  }
  //console.log(error.config);
} */
