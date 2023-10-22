import { createSlice } from '@reduxjs/toolkit';

import { Recipe } from '@lob/client/glist/recipes/data';
import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { recipeCaseReducers } from './recipe.case-reducers';

export const recipeSliceName = 'recipe';

export interface RecipeState {
  recipes: Recipe[];
  isLoading: boolean;
  error: Error | null;
  deleteState: AjaxState<string>;
  hasAttempted: boolean;
}

export const initialRecipeState: RecipeState = {
  recipes: [],
  isLoading: false,
  error: null,
  hasAttempted: false,
  deleteState: createAjaxState('', false, null)
};

export interface State {
  [recipeSliceName]: RecipeState;
}

export const slice = createSlice({
  name: recipeSliceName,
  initialState: initialRecipeState,
  reducers: recipeCaseReducers
});

export const { actions, reducer } = slice;
