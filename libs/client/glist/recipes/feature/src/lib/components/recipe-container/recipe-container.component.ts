import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

import { GlistFacadeService } from '@lob/client/glist/glists/data-access';
import { Recipe, RecipeFilter } from '@lob/client/glist/recipes/data';
import { RecipeFacadeService } from '@lob/client/glist/recipes/data-access';
import { RecipeCardComponent } from '@lob/client/glist/recipes/ui';
import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { DeviceService } from '@lob/client/shared/device/data-access';
import { AbstractRedirectComponent } from '@lob/client/shared/lifecycle-management/data-access';
import { UiVisibilityTarget } from '@lob/client/shared/mobile/utilities/data';
import { ScrollVisibilityDirective } from '@lob/client/shared/mobile/utilities/data-access';

import { RecipeEditorComponent } from '../recipe-editor/recipe-editor.component';

@Component({
  selector: 'glist-recipe-container',
  templateUrl: './recipe-container.component.html',
  styleUrls: ['./recipe-container.component.scss'],
  standalone: true,
  imports: [ScrollVisibilityDirective, MatTabsModule, MatButtonModule, MatIconModule, NgTemplateOutlet, RecipeCardComponent, AsyncPipe]
})
export class RecipeContainerComponent extends AbstractRedirectComponent implements OnInit, OnDestroy {
  readonly tabNames = ['All Recipes', 'Favorites'];
  readonly scrollVisibilityKey = UiVisibilityTarget.TOP_BAR;
  recipes: Recipe[] = [];
  favoriteRecipes: Recipe[] = [];
  selectedTab = 'All Recipes';

  constructor(
    private recipeFacadeService: RecipeFacadeService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private glistFacadeService: GlistFacadeService,
    public deviceService: DeviceService,
    userFacadeService: UserFacadeService
  ) {
    super(userFacadeService.isUserSignedInAfterAttempt$.pipe(map((isSignedIn) => !isSignedIn)));
  }

  public ngOnInit(): void {
    this.getRecipes();
    this.getFakeRecipes();
  }

  doRedirect(): void {
    this.router.navigate(['dashboard']);
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
    this.glistFacadeService.addRecipeToGlist(recipe);
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
