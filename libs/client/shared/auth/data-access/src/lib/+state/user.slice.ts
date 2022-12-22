import { createSlice } from '@reduxjs/toolkit';

import { User } from '@lob/client/shared/auth/data';

import { userCaseReducers } from './user.case-reducers';

export const userSliceName = 'user';

export interface UserState {
  user: User;
  isLoading: boolean;
  error: Error | null;
}

export const initialUserState: UserState = {
  user: {
    id: ''
  },
  isLoading: false,
  error: null
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
