import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '@lob/client/shared/auth/data';

import { userSliceName, UserState } from './user.slice';

export const selectUserState = createFeatureSelector<UserState>(userSliceName);

export const selectUser = createSelector(selectUserState, (state): User => state.user as User);
export const selectUserLoading = createSelector(selectUserState, (state): boolean => state.isLoading);
export const selectUserError = createSelector(selectUserState, (state): Error | null => state.error);
