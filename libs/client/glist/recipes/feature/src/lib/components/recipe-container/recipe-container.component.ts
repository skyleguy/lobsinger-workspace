import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { GlistFacadeService } from '@lob/client/glist/glists/data-access';
import { Recipe, RecipeFilter } from '@lob/client/glist/recipes/data';
import { RecipeFacadeService } from '@lob/client/glist/recipes/data-access';
import { RecipeEditorComponent } from '@lob/client/glist/recipes/ui';
import { DeviceService } from '@lob/client/shared/device/data-access';
import { AbstractSubscriptionComponent } from '@lob/client/shared/lifecycle-management/data-access';

@Component({
  selector: 'glist-recipe-container',
  templateUrl: './recipe-container.component.html',
  styleUrls: ['./recipe-container.component.scss']
})
export class RecipeContainerComponent extends AbstractSubscriptionComponent implements OnInit, OnDestroy {
  readonly tabNames = ['All Recipes', 'Favorites'];
  recipes: Recipe[] = [];
  favoriteRecipes: Recipe[] = [];
  selectedTab = 'All Recipes';

  constructor(
    private recipeFacadeService: RecipeFacadeService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private glistFacadeService: GlistFacadeService,
    public deviceService: DeviceService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getRecipes();
    this.getFakeRecipes();
  }

  onRecipeFilterChange(recipeFilter: RecipeFilter): void {
    console.warn(`Filtering not yet supported: ${JSON.stringify(recipeFilter, null, 2)}`);
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

  public routeToRecipe(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  public toggleRecipeFavorite(recipe: Recipe): void {
    this.recipeFacadeService.updateRecipe({
      id: recipe.id,
      isFavorited: !recipe.isFavorited
    });
  }

  public addRecipeToGlist(recipe: Recipe): void {
    this.glistFacadeService.addRecipeToGlist(recipe.id);
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
