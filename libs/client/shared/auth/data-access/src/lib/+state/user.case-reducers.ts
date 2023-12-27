import { PayloadAction } from '@reduxjs/toolkit';
import { FirebaseApp } from 'firebase/app';

import { User } from '@lob/client/shared/auth/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { UserState } from './user.slice';

export const userCaseReducers = {
  signUserIn: (state: UserState, _action: PayloadAction<{ app?: FirebaseApp; isSilent: boolean }>): UserState => {
    return {
      ...state,
      user: createAjaxState(undefined, true),
      hasAttemptedSignOn: false
    };
  },
  signUserInSuccess: (state: UserState, { payload }: PayloadAction<User>): UserState => {
    return {
      ...state,
      user: createAjaxState(payload),
      hasAttemptedSignOn: true
    };
  },
  signUserInError: (state: UserState, { payload }: PayloadAction<Error>): UserState => {
    console.error(payload);
    return {
      ...state,
      user: createAjaxState(null, false, payload),
      hasAttemptedSignOn: true
    };
  },
  logUserOut: (state: UserState): UserState => {
    return {
      ...state,
      user: createAjaxState(null, false),
      hasAttemptedSignOn: false
    };
  },
  silentSignInError: (state: UserState): UserState => {
    return {
      ...state,
      user: createAjaxState(undefined, false, new Error('User not silently signed in')),
      hasAttemptedSignOn: true
    };
  }
};
