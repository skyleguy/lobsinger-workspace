import { createFeatureSelector, createSelector } from '@ngrx/store';

import { firebaseAppSliceName, FirebaseAppState } from './firebase-app.slice';

export const selectFirebaseAppState = createFeatureSelector<FirebaseAppState>(firebaseAppSliceName);

export const selectAppData = createSelector(selectFirebaseAppState, (state) => state.app.data);
export const selectAppLoading = createSelector(selectFirebaseAppState, (state) => state.app.loading);
export const selectAppError = createSelector(selectFirebaseAppState, (state) => state.app.error);
