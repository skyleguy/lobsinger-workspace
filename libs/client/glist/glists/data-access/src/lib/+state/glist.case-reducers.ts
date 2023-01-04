import { PayloadAction } from '@reduxjs/toolkit';

import { Glist } from '@lob/client/glist/glists/data';
import { Ingredient } from '@lob/client/glist/recipes/data';

import { GlistState } from './glist.slice';

export const glistCaseReducers = {
  getUserGlist: (state: GlistState): GlistState => {
    return {
      ...state,
      isLoading: true
    };
  },
  getUserGlistSuccess: (state: GlistState, { payload }: PayloadAction<Glist>): GlistState => {
    return {
      ...state,
      glist: payload,
      isLoading: false,
      hasAttempted: true
    };
  },
  getUserGlistError: (state: GlistState, { payload }: PayloadAction<Error>): GlistState => {
    return {
      ...state,
      glist: {
        ...state.glist,
        recipes: [],
        ingredients: []
      },
      isLoading: false,
      error: payload,
      hasAttempted: true
    };
  },
  addRecipeToGlist: (state: GlistState, _action: PayloadAction<string>): GlistState => {
    return {
      ...state,
      isLoading: true
    };
  },
  addRecipeToGlistSuccess: (state: GlistState, { payload }: PayloadAction<string>): GlistState => {
    return {
      ...state,
      glist: {
        ...state.glist,
        recipes: [...state.glist.recipes, payload]
      },
      isLoading: false
    };
  },
  addRecipeToGlistError: (state: GlistState, { payload }: PayloadAction<Error>): GlistState => {
    return {
      ...state,
      isLoading: false,
      error: payload
    };
  },
  deleteRecipeFromGlist: (state: GlistState, _action: PayloadAction<string>): GlistState => {
    return {
      ...state,
      isLoading: true
    };
  },
  deleteRecipeFromGlistSuccess: (state: GlistState, { payload }: PayloadAction<string>): GlistState => {
    return {
      ...state,
      glist: {
        ...state.glist,
        recipes: state.glist.recipes.filter((rec) => rec !== payload)
      },
      isLoading: false
    };
  },
  deleteRecipeFromGlistError: (state: GlistState, { payload }: PayloadAction<Error>): GlistState => {
    return {
      ...state,
      isLoading: false,
      error: payload
    };
  },
  addIngredientToGlist: (state: GlistState, _action: PayloadAction<Ingredient>): GlistState => {
    return {
      ...state,
      isLoading: true
    };
  },
  addIngredientToGlistSuccess: (state: GlistState, { payload }: PayloadAction<Ingredient>): GlistState => {
    return {
      ...state,
      glist: {
        ...state.glist,
        ingredients: [...state.glist.ingredients, payload]
      },
      isLoading: false
    };
  },
  addIngredientToGlistError: (state: GlistState, { payload }: PayloadAction<Error>): GlistState => {
    return {
      ...state,
      isLoading: false,
      error: payload
    };
  },
  updateIngredientFromGlist: (state: GlistState, _action: PayloadAction<Ingredient>): GlistState => {
    return {
      ...state,
      isLoading: true
    };
  },
  updateIngredientFromGlistSuccess: (state: GlistState, { payload }: PayloadAction<Ingredient>): GlistState => {
    const newIngredients = [...state.glist.ingredients];
    const foundIndex = newIngredients.findIndex((ingredient) => ingredient.name === payload.name);
    if (foundIndex > -1) {
      newIngredients[foundIndex] = { ...newIngredients[foundIndex], ...payload };
    }
    return {
      ...state,
      glist: {
        ...state.glist,
        ingredients: newIngredients
      },
      isLoading: false
    };
  },
  updateIngredientFromGlistError: (state: GlistState, { payload }: PayloadAction<Error>): GlistState => {
    return {
      ...state,
      isLoading: false,
      error: payload
    };
  },
  deleteIngredientFromGlist: (state: GlistState, _action: PayloadAction<Ingredient>): GlistState => {
    return {
      ...state,
      isLoading: true
    };
  },
  deleteIngredientFromGlistSuccess: (state: GlistState, { payload }: PayloadAction<Ingredient>): GlistState => {
    return {
      ...state,
      glist: {
        ...state.glist,
        ingredients: state.glist.ingredients.filter((rec) => rec.name !== payload.name)
      },
      isLoading: false
    };
  },
  deleteIngredientFromGlistError: (state: GlistState, { payload }: PayloadAction<Error>): GlistState => {
    return {
      ...state,
      isLoading: false,
      error: payload
    };
  }
};
