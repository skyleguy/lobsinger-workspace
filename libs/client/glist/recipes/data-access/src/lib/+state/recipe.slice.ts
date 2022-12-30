import { createSlice } from '@reduxjs/toolkit';

import { Recipe } from '@lob/client/glist/recipes/data';

import { recipeCaseReducers } from './recipe.case-reducers';

export const recipeSliceName = 'recipe';

export interface RecipeState {
  recipes: Recipe[];
  isLoading: boolean;
  error: Error | null;
  hasAttempted: boolean;
}

export const initialRecipeState: RecipeState = {
  recipes: [],
  isLoading: false,
  error: null,
  hasAttempted: false
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
