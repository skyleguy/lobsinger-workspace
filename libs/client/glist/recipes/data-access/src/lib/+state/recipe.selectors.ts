import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Recipe } from '@lob/client/glist/recipes/data';

import { recipeSliceName, RecipeState } from './recipe.slice';

export const selectRecipeState = createFeatureSelector<RecipeState>(recipeSliceName);

export const selectRecipes = createSelector(selectRecipeState, (state): Recipe[] => state.recipes);
export const selectRecipeById = (id: string) =>
  createSelector(selectRecipeState, (state): Recipe | undefined => {
    return state.recipes.find((rec) => rec.id === id);
  });
export const selectRecipesByIds = (ids: string[]) =>
  createSelector(selectRecipeState, (state): Recipe[] => {
    return state.recipes.filter((rec) => ids.includes(rec.id));
  });
export const selectHasAttempted = createSelector(selectRecipeState, (state): boolean => state.hasAttempted);
export const selectFavoriteRecipes = createSelector(selectRecipeState, (state): Recipe[] =>
  state.recipes.filter((recipe) => recipe.isFavorited)
);
export const selectRecipeLoading = createSelector(selectRecipeState, (state): boolean => state.isLoading);
export const selectRecipeError = createSelector(selectRecipeState, (state): Error | null => state.error);
