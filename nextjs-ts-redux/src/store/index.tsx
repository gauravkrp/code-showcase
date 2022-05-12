import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, Action, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer, { authInitialState } from './auth/reducer';
import { loadingReducer } from './loadingReducer';

const initialState = {
  auth: authInitialState,
  loading: {},
};

const combinedReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});

const reducer = (state = initialState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const clientState = { ...state }; // use previous state
    const serverState = { ...action.payload }; // apply delta from hydration
    const nextState = { ...clientState, ...serverState };
    // preserve authentication state on client side navigation
    if (action.payload.auth.loggedIn) {
      nextState.auth = action.payload.auth;
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: reducer,
    devTools: true,
  });

export const store = makeStore();

// store types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>; // ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type AppDispatch = typeof store.dispatch;

// store hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// store wrapper for _app.tsx
export const wrapper = createWrapper<AppStore>(makeStore);
