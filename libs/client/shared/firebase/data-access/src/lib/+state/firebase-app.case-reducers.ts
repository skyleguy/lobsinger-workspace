import { PayloadAction } from '@reduxjs/toolkit';
import { FirebaseApp } from 'firebase/app';

import { createAjaxState } from '@lob/shared/data-management/util';

import { FirebaseAppState } from './firebase-app.slice';

export const firebaseCaseReducers = {
  getFirebaseApp: (state: FirebaseAppState): FirebaseAppState => {
    return {
      ...state,
      app: createAjaxState(null, true)
    };
  },
  getFirebaseAppSuccess: (state: FirebaseAppState, { payload }: PayloadAction<FirebaseApp>): FirebaseAppState => {
    return {
      ...state,
      app: createAjaxState(payload)
    };
  },
  getFirebaseAppError: (state: FirebaseAppState, { payload }: PayloadAction<Error>): FirebaseAppState => {
    return {
      ...state,
      app: createAjaxState(null, false, payload)
    };
  }
};
