import { PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '@lob/client/glist/recipes/data';
import { FirestoreData } from '@lob/client/shared/firebase/data';

import { RecipeState } from './recipe.slice';

export const recipeCaseReducers = {
  getUserRecipes: (state: RecipeState): RecipeState => {
    return {
      ...state,
      isLoading: true
    };
  },
  getUserRecipesSuccess: (state: RecipeState, { payload }: PayloadAction<Recipe[]>): RecipeState => {
    return {
      ...state,
      recipes: payload,
      isLoading: false,
      hasAttempted: true
    };
  },
  getUserRecipesError: (state: RecipeState, { payload }: PayloadAction<Error>): RecipeState => {
    return {
      ...state,
      recipes: [],
      isLoading: false,
      error: payload,
      hasAttempted: true
    };
  },
  addRecipe: (state: RecipeState, _action: PayloadAction<Recipe>): RecipeState => {
    return {
      ...state,
      isLoading: true
    };
  },
  addRecipeSuccess: (state: RecipeState, { payload }: PayloadAction<Recipe>): RecipeState => {
    return {
      ...state,
      recipes: [...state.recipes, payload],
      isLoading: false
    };
  },
  addRecipeError: (state: RecipeState, { payload }: PayloadAction<Error>): RecipeState => {
    return {
      ...state,
      isLoading: false,
      error: payload
    };
  },
  deleteRecipe: (state: RecipeState, _action: PayloadAction<Recipe>): RecipeState => {
    return {
      ...state,
      isLoading: true
    };
  },
  deleteRecipeSuccess: (state: RecipeState, { payload }: PayloadAction<Recipe>): RecipeState => {
    return {
      ...state,
      recipes: state.recipes.filter((rec) => rec.id !== payload.id),
      isLoading: false
    };
  },
  deleteRecipeError: (state: RecipeState, { payload }: PayloadAction<Error>): RecipeState => {
    return {
      ...state,
      isLoading: false,
      error: payload
    };
  },
  updateRecipe: (state: RecipeState, _action: PayloadAction<Partial<Recipe> & FirestoreData>): RecipeState => {
    return {
      ...state,
      isLoading: true
    };
  },
  updateRecipeSuccess: (state: RecipeState, { payload }: PayloadAction<Partial<Recipe>>): RecipeState => {
    const newRecipes = [...state.recipes];
    const foundIndex = newRecipes.findIndex((rec) => rec.id === payload.id);
    if (foundIndex > -1) {
      newRecipes[foundIndex] = { ...newRecipes[foundIndex], ...payload };
    }
    return {
      ...state,
      recipes: newRecipes,
      isLoading: false
    };
  },
  updateRecipeError: (state: RecipeState, { payload }: PayloadAction<Error>): RecipeState => {
    return {
      ...state,
      isLoading: false,
      error: payload
    };
  }
};
