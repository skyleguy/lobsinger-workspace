import { PayloadAction } from '@reduxjs/toolkit';
import { FirebaseApp } from 'firebase/app';

import { User } from '@lob/client/shared/auth/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { UserState } from './user.slice';

export const userCaseReducers = {
  signUserIn: (state: UserState, _action: PayloadAction<{ app?: FirebaseApp; isSilent: boolean }>): UserState => {
    return {
      ...state,
      user: createAjaxState(null, true)
    };
  },
  signUserInSuccess: (state: UserState, { payload }: PayloadAction<User>): UserState => {
    return {
      ...state,
      user: createAjaxState(payload)
    };
  },
  signUserInError: (state: UserState, { payload }: PayloadAction<Error>): UserState => {
    return {
      ...state,
      user: createAjaxState(null, false, payload)
    };
  },
  logUserOut: (state: UserState): UserState => {
    return {
      ...state,
      user: createAjaxState(null, false)
    };
  },
  silentSignInError: (state: UserState): UserState => {
    return {
      ...state,
      user: createAjaxState(null, false, new Error('User no silently signed in'))
    };
  }
};
