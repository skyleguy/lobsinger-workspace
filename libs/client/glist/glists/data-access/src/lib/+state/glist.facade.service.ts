import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Ingredient } from '@lob/client/glist/recipes/data';

import * as selectors from './glist.selectors';
import { actions, GlistState } from './glist.slice';

@Injectable()
export class GlistFacadeService {
  glist$ = this.store.pipe(select(selectors.selectGlist));
  recipesIds$ = this.store.pipe(select(selectors.selectGlistRecipes));
  ingredients$ = this.store.pipe(select(selectors.selectGlistIngredients));
  isLoading$ = this.store.pipe(select(selectors.selectGlistLoading));
  userError$ = this.store.pipe(select(selectors.selectGlistError));

  constructor(private readonly store: Store<GlistState>) {
    this.getUserGlist();
  }

  public getUserGlist(): void {
    this.store.dispatch(actions.getUserGlist());
  }

  public addRecipeToGlist(recipeId: string): void {
    this.store.dispatch(actions.addRecipeToGlist(recipeId));
  }

  public deleteRecipeFromGlist(recipeId: string): void {
    this.store.dispatch(actions.deleteRecipeFromGlist(recipeId));
  }

  public addIngredientToGlist(ingredient: Ingredient): void {
    this.store.dispatch(actions.addIngredientToGlist(ingredient));
  }

  public updateIngredientFromList(ingredient: Ingredient): void {
    this.store.dispatch(actions.updateIngredientFromGlist(ingredient));
  }

  public deleteIngredientFromGlist(ingredient: Ingredient): void {
    this.store.dispatch(actions.deleteIngredientFromGlist(ingredient));
  }
}
