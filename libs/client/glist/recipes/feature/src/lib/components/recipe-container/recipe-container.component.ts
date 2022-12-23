import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Recipe } from '@lob/client/glist/recipes/data';
import { RecipeFacadeService } from '@lob/client/glist/recipes/data-access';
import { RecipeEditorComponent } from '@lob/client/glist/recipes/ui';
import { SubSinker } from '@lob/client/shared/lifecycle-management/data';

@Component({
  selector: 'glist-recipe-container',
  templateUrl: './recipe-container.component.html',
  styleUrls: ['./recipe-container.component.scss']
})
export class RecipeContainerComponent implements OnInit, OnDestroy {
  readonly sub: SubSinker = new SubSinker();

  recipes: Recipe[] = [];
  favoriteRecipes: Recipe[] = [];

  constructor(private recipeFacadeService: RecipeFacadeService, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.getRecipes();
    this.getFakeRecipes();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public addRecipe(): void {
    this.dialog
      .open(RecipeEditorComponent, {
        height: '90%',
        width: '100%'
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          if (res) {
            const recipe = res as Recipe;
            this.recipeFacadeService.addRecipe(recipe);
          }
        }
      });
  }

  private getRecipes(): void {
    this.sub.sink = this.recipeFacadeService.recipes$.subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      }
    });
  }

  private getFakeRecipes(): void {
    this.sub.sink = this.recipeFacadeService.favoriteRecipes$.subscribe({
      next: (favRecipes) => {
        this.favoriteRecipes = favRecipes;
      }
    });
  }
}
