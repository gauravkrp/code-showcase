import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import abcSReducer from './abcs';

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  abcs: abcSReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: rootReducer
});
