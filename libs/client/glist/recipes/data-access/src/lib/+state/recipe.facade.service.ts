import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, switchMap } from 'rxjs';

import { Recipe } from '@lob/client/glist/recipes/data';
import { FirestoreData } from '@lob/client/shared/firebase/data';

import * as selectors from './recipe.selectors';
import { selectRecipeById, selectRecipesByIds } from './recipe.selectors';
import { actions, RecipeState } from './recipe.slice';

@Injectable()
export class RecipeFacadeService {
  recipes$ = this.store.pipe(
    select(selectors.selectHasAttempted),
    filter((hasAttempted) => {
      if (!hasAttempted) {
        this.getUserRecipes();
      }
      return hasAttempted;
    }),
    switchMap(() => this.store.pipe(select(selectors.selectRecipes)))
  );

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

  public updateRecipe(recipe: Partial<Recipe> & FirestoreData): void {
    this.store.dispatch(actions.updateRecipe(recipe));
  }

  public deleteRecipe(recipe: Recipe): void {
    this.store.dispatch(actions.deleteRecipe(recipe));
  }

  public getRecipeById(id: string) {
    return this.store.pipe(select(selectRecipeById(id)));
  }

  public getRecipesByIds(ids: string[]) {
    return this.store.pipe(
      select(selectors.selectHasAttempted),
      filter((hasAttempted) => {
        if (!hasAttempted) {
          this.getUserRecipes();
        }
        return hasAttempted;
      }),
      switchMap(() => this.store.pipe(select(selectRecipesByIds(ids))))
    );
  }
}
