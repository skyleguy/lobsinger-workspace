import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Glist } from '@lob/client/glist/glists/data';
import { Ingredient } from '@lob/shared/ingredients/data';

import { glistSliceName, GlistState } from './glist.slice';

export const selectGlistState = createFeatureSelector<GlistState>(glistSliceName);

export const selectGlist = createSelector(selectGlistState, (state): Glist => state.glist);
export const selectGlistRecipes = createSelector(selectGlistState, (state): string[] => state.glist.recipes);
export const selectGlistIngredients = createSelector(selectGlistState, (state): Ingredient[] => state.glist.ingredients);
export const selectHasAttempted = createSelector(selectGlistState, (state): boolean => state.hasAttempted);
export const selectGlistLoading = createSelector(selectGlistState, (state): boolean => state.isLoading);
export const selectGlistError = createSelector(selectGlistState, (state): Error | null => state.error);
