import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { deepCopy } from '@firebase/util';
import { filter, map, switchMap } from 'rxjs';

import { GlistFacadeService } from '@lob/client/glist/glists/data-access';
import { favoritedRecipeText, Ingredient, Recipe, unfavoritedRecipeText } from '@lob/client/glist/recipes/data';
import { RecipeFacadeService } from '@lob/client/glist/recipes/data-access';
import { ArrayUtils } from '@lob/client/shared/helpers/util';
import { ConfirmActionComponent } from '@lob/client/shared/user-actions/ui';

import { RecipeEditorComponent } from '../recipe-editor/recipe-editor.component';

@Component({
  selector: 'glist-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  readonly favoritedRecipeText = favoritedRecipeText;
  readonly unfavoritedRecipeText = unfavoritedRecipeText;

  recipe!: Recipe;
  originalIngredients: Ingredient[] = [];

  constructor(
    private recipeFacadeService: RecipeFacadeService,
    private router: Router,
    private dialog: MatDialog,
    private glistFacadeService: GlistFacadeService
  ) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(
        map((event) => event as Scroll),
        filter((scroll) => scroll.routerEvent instanceof NavigationEnd),
        map((event) => event.routerEvent),
        map((navEnd) => ArrayUtils.getLast<string>(navEnd.url?.split('/'))),
        switchMap((recipeId) => this.recipeFacadeService.getUserById(recipeId ?? ''))
      )
      .subscribe({
        next: (recipe) => {
          if (!recipe) {
            this.recipeFacadeService.getUserRecipes();
          } else {
            this.recipe = recipe;
            this.originalIngredients = recipe.ingredients;
          }
        }
      });
  }

  public editRecipe(): void {
    this.dialog
      .open(RecipeEditorComponent, {
        height: '90%',
        width: '100%',
        data: deepCopy(this.recipe)
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          if (res) {
            this.recipeFacadeService.updateRecipe(res);
          }
        }
      });
  }

  public buttonToggleChanged(buttonEvent: number | undefined): void {
    if (buttonEvent) {
      this.recipe = deepCopy(this.recipe);
      this.recipe.ingredients = deepCopy(this.originalIngredients).map((ingredient) => {
        const numberRegex = /[0-9]+/g;
        const numberMatch: string = ingredient.amount.match(numberRegex)?.[0] ?? '';
        const newNumberMatch = +numberMatch * buttonEvent;
        ingredient.amount = ingredient.amount.replace(numberRegex, `${newNumberMatch}`);
        return ingredient;
      });
    }
  }

  public toggleRecipeFavorite(): void {
    this.recipeFacadeService.updateRecipe({
      id: this.recipe.id,
      isFavorited: !this.recipe.isFavorited
    });
  }

  public addRecipeToGlist(): void {
    this.glistFacadeService.addRecipeToGlist(this.recipe.id);
  }

  public deleteRecipe(): void {
    this.dialog
      .open(ConfirmActionComponent, {
        data: {
          phrase: `Are you sure you want to delete the recipe titled ${this.recipe.title}?`
        }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.recipeFacadeService.deleteRecipe(this.recipe);
            this.router.navigate(['recipes']);
          }
        }
      });
  }
}
