// import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// @ToDo convert these functions into a hook.

export const save = async (key, value) => {
  try {
    const isStorageAvailable = await SecureStore.isAvailableAsync();
    if (isStorageAvailable){
      await SecureStore.setItemAsync(key, value);
    } else {
      console.error('Secure storage is not available.');
    }
  } catch (e) {
    console.error(`failed to save value [${value}] for key [${key}] :-`, e);
  }
}

export const getValueFor = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

export const deleteValueFor = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`failed to delete value for key [${key}] :-`, error);
  }
}
