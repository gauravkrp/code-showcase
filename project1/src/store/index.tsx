import { useMemo } from 'react';
import { createStore, applyMiddleware, AnyAction, combineReducers  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

//import authReducer, { authInitialState } from './auth/reducer';
import recruiterReducer, { recruiterInitialState } from './recruiter/reducer';
import initialize from '../auth/authInit';

const bindMiddleware = (middleware:any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware)
}

const state = {
  //...authInitialState,
  ...recruiterInitialState
}

const combinedReducer = combineReducers({
  //authentication: authReducer,
  recruiters: recruiterReducer,
})

export const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    console.log(state, action)
    if (state.authentication) nextState.authentication = {...action.payload.authentication} // preserve authentication state on client side navigation
    console.log(nextState)
    return nextState
  } 
  else {
    return combinedReducer(state, action)
  }
}

const initStore: MakeStore = (context: Context) => {
  return createStore(reducer, bindMiddleware([thunkMiddleware,logger]))
}

export const wrapper = createWrapper(initStore, { debug: true })