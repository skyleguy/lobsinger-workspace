import { createSlice } from '@reduxjs/toolkit';

import { Glist } from '@lob/client/glist/glists/data';

import { glistCaseReducers } from './glist.case-reducers';

export const glistSliceName = 'glist';

export interface GlistState {
  glist: Glist;
  isLoading: boolean;
  error: Error | null;
  hasAttempted: boolean;
}

export const initialGlistState: GlistState = {
  glist: { recipes: [], ingredients: [], id: '' },
  isLoading: false,
  error: null,
  hasAttempted: false
};

export interface State {
  [glistSliceName]: GlistState;
}

export const slice = createSlice({
  name: glistSliceName,
  initialState: initialGlistState,
  reducers: glistCaseReducers
});

export const { actions, reducer } = slice;
