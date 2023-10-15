import { createFeatureSelector, createSelector } from '@ngrx/store';

import { userSliceName, UserState } from './user.slice';

export const selectUserState = createFeatureSelector<UserState>(userSliceName);

export const selectUser = createSelector(selectUserState, (state) => state.user.data);
export const selectUserLoading = createSelector(selectUserState, (state) => state.user.loading);
export const selectUserError = createSelector(selectUserState, (state) => state.user.error);
export const selectIsUserSignedIn = createSelector(selectUserState, (state) => !!state.user.data);
