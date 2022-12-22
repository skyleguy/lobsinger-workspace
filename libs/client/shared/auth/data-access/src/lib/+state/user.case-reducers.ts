import { PayloadAction } from '@reduxjs/toolkit';
import { FirebaseApp } from 'firebase/app';

import { User } from '@lob/client/shared/auth/data';

import { UserState } from './user.slice';

export const userCaseReducers = {
  getUser: (state: UserState, _action: PayloadAction<{ app?: FirebaseApp }>): UserState => {
    return {
      ...state,
      isLoading: true
    };
  },
  getUserSuccess: (state: UserState, { payload }: PayloadAction<User>): UserState => {
    return {
      ...state,
      user: payload,
      isLoading: false
    };
  },
  getUserError: (state: UserState, { payload }: PayloadAction<Error>): UserState => {
    return {
      ...state,
      user: { id: '' },
      isLoading: false,
      error: payload
    };
  }
};
