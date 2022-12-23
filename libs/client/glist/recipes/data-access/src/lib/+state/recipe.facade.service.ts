import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Recipe } from '@lob/client/glist/recipes/data';

import * as selectors from './recipe.selectors';
import { actions, RecipeState } from './recipe.slice';

@Injectable()
export class RecipeFacadeService {
  recipes$ = this.store.pipe(select(selectors.selectRecipes));
  favoriteRecipes$ = this.store.pipe(select(selectors.selectFavoriteRecipes));
  isLoading$ = this.store.pipe(select(selectors.selectRecipeLoading));
  userError$ = this.store.pipe(select(selectors.selectRecipeLoading));

  constructor(private readonly store: Store<RecipeState>) {}

  public getUserRecipes(): void {
    this.store.dispatch(actions.getUserRecipes());
  }

  public addRecipe(recipe: Recipe): void {
    this.store.dispatch(actions.addRecipe(recipe));
  }
}
