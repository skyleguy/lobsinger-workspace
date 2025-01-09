import { TitleCasePipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { deepCopy } from '@firebase/util';
import { isNil } from 'lodash';
import { filter, map, switchMap } from 'rxjs';

import { GlistFacadeService } from '@lob/client/glist/glists/data-access';
import { favoritedRecipeText, Recipe, unfavoritedRecipeText } from '@lob/client/glist/recipes/data';
import { RecipeFacadeService } from '@lob/client/glist/recipes/data-access';
import { AbstractSubscriptionComponent } from '@lob/client/shared/lifecycle-management/data-access';
import { ConfirmActionComponent } from '@lob/client/shared/user-actions/ui';
import { Ingredient } from '@lob/shared/ingredients/data';

import { RecipeEditorComponent } from '../recipe-editor/recipe-editor.component';

@Component({
    selector: 'glist-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss'],
    imports: [MatButtonModule, MatIconModule, MatChipsModule, MatButtonToggleModule, TitleCasePipe, DatePipe]
})
export class RecipeDetailsComponent extends AbstractSubscriptionComponent implements OnInit {
  readonly favoritedRecipeText = favoritedRecipeText;
  readonly unfavoritedRecipeText = unfavoritedRecipeText;

  recipe!: Recipe;
  originalIngredients: Ingredient[] = [];

  constructor(
    private recipeFacadeService: RecipeFacadeService,
    private router: Router,
    private dialog: MatDialog,
    private glistFacadeService: GlistFacadeService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setLoadingState();
    this.handleDeleteRecipeData();
    this.handleDeleteRecipeError();
    this.handleRouteState();
  }

  private handleRouteState() {
    this.sub.sink = this.activatedRoute.params
      .pipe(
        map((params) => params?.['id']),
        filter((id) => !isNil(id)),
        switchMap((recipeId) => this.recipeFacadeService.getRecipeById(recipeId))
      )
      .subscribe({
        next: (recipe) => {
          if (!recipe) {
            this.recipeFacadeService.getUserRecipes();
          } else {
            this.recipe = recipe;
            this.originalIngredients = recipe.ingredients;
            this.setDataState();
          }
        }
      });
  }

  private handleDeleteRecipeData() {
    this.sub.sink = this.recipeFacadeService.deleteRecipeData$.subscribe({
      next: (deletedRecipeId) => {
        if (this.recipe?.id === deletedRecipeId) {
          this.router.navigate(['recipes']);
        }
      }
    });
  }

  private handleDeleteRecipeError() {
    this.sub.sink = this.recipeFacadeService.deleteRecipeError$.subscribe({
      next: (deleteError) => {
        if (deleteError) {
          this.setErrorState();
        }
      }
    });
  }

  public editRecipe(): void {
    this.sub.sink = this.dialog
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
    this.glistFacadeService.addRecipeToGlist(this.recipe);
  }

  public deleteRecipe(): void {
    this.sub.sink = this.dialog
      .open(ConfirmActionComponent, {
        data: {
          phrase: `Are you sure you want to delete the recipe titled ${this.recipe.title}?`
        }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.setLoadingState();
            this.recipeFacadeService.deleteRecipe(this.recipe);
          }
        }
      });
  }
}
