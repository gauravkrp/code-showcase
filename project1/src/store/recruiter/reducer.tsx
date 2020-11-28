import { authActionTypes } from './actions'
import { updateObject } from '../utility'

export const recruiterInitialState = {
  recruitersList: '',
  recruitersCount: '',
  apiFailure: '',
  apiSuccess: '',
};

const recruitersList = (state: any, action: any) => {
  return updateObject(state, {
    recruitersList: action.payload,
  });
};

const recruitersCount = (state: any, action: any) => {
  return updateObject(state, {
    recruitersCount: action.payload,
  });
};
  
const apiDone = (state: any, action: any) => {
  return updateObject(state, {
    apiSuccess: action.payload,
    apiFailure: ""
  });
};

const apiFail = (state: any, action: any) => {
  return updateObject(state, {
    apiFailure: action.payload,
    apiSuccess: ""
  });
};

const reducer = (state = recruiterInitialState, action:any ) => {
  switch ( action.type ) {
    case authActionTypes.FETCH_RECRUITER_LIST: return recruitersList(state, action);
    case authActionTypes.FETCH_RECRUITER_COUNT: return recruitersCount(state, action);
    case authActionTypes.API_SUCCESS: return apiDone(state, action);
    case authActionTypes.API_FAILURE: return apiFail(state, action);
    default:
      return state;
  }
};

export default reducer;