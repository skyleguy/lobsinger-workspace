import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Recipe } from '@lob/client/glist/recipes/data';

import { recipeSliceName, RecipeState } from './recipe.slice';

export const selectRecipeState = createFeatureSelector<RecipeState>(recipeSliceName);

export const selectRecipes = createSelector(selectRecipeState, (state): Recipe[] => state.recipes);
export const selectFavoriteRecipes = createSelector(selectRecipeState, (state): Recipe[] => state.recipes);
export const selectRecipeLoading = createSelector(selectRecipeState, (state): boolean => state.isLoading);
export const selectRecipeError = createSelector(selectRecipeState, (state): Error | null => state.error);
