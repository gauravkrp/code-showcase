import { AnyAction } from 'redux'; 
import { authActionTypes } from './actions';
import { updateObject, actionTypeStatus } from '../utility';
import { TypeObject } from 'types';

interface AuthInitialState {
  loggedIn: boolean;
  error: any;
  user: TypeObject;
  platform: TypeObject;
}

export const authInitialState: AuthInitialState = {
  loggedIn: false,
  error: '',
  platform: {},
  user: {},
};

const authRequest = (state: AuthInitialState, action: AnyAction) => {
  return updateObject(state, {
    ...action.payload,
  });
};

const reducer = (state = authInitialState, action: AnyAction) => {
  switch (action.type) {
    case `${authActionTypes.LOGIN}_${actionTypeStatus.SUCCESS}`:
      return authRequest(state, action);
    case `${authActionTypes.LOGIN}_${actionTypeStatus.FAILURE}`:
      return authRequest(state, action);
    case `${authActionTypes.LOGOUT}`:
      return authRequest(state, action);
    default:
      return state;
  }
};

export default reducer;
