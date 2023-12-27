import { createSlice } from '@reduxjs/toolkit';
import { FirebaseApp } from 'firebase/app';

import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { firebaseCaseReducers } from './firebase-app.case-reducers';

export const firebaseAppSliceName = 'firebase';

export interface FirebaseAppState {
  app: AjaxState<FirebaseApp | null>;
}

export const initialFirebaseState: FirebaseAppState = {
  app: createAjaxState(null)
};

export interface State {
  [firebaseAppSliceName]: FirebaseAppState;
}

export const slice = createSlice({
  name: firebaseAppSliceName,
  initialState: initialFirebaseState,
  reducers: firebaseCaseReducers
});

export const { actions, reducer } = slice;
