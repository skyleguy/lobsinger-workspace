import { createSlice } from '@reduxjs/toolkit';

import { User } from '@lob/client/shared/auth/data';
import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { userCaseReducers } from './user.case-reducers';

export const userSliceName = 'user';

export interface UserState {
  user: AjaxState<User | undefined | null>;
  hasAttemptedSignOn: boolean;
}

export const initialUserState: UserState = {
  user: createAjaxState<User | undefined | null>(undefined),
  hasAttemptedSignOn: false
};

export interface State {
  [userSliceName]: UserState;
}

export const slice = createSlice({
  name: userSliceName,
  initialState: initialUserState,
  reducers: userCaseReducers
});

export const { actions, reducer } = slice;
