import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { map, switchMap } from 'rxjs';

import { GlistFacadeService } from '@lob/client/glist/glists/data-access';
import { IngredientsListComponent } from '@lob/client/glist/glists/ui';
import { RecipeFacadeService } from '@lob/client/glist/recipes/data-access';
import { RecipeCardComponent } from '@lob/client/glist/recipes/ui';
import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { AbstractRedirectComponent } from '@lob/client/shared/lifecycle-management/data-access';
import { Ingredient } from '@lob/shared/ingredients/data';

@Component({
  selector: 'glist-glist-container',
  templateUrl: './glist-container.component.html',
  styleUrls: ['./glist-container.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    LetDirective,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    IngredientsListComponent,
    NgTemplateOutlet,
    RecipeCardComponent,
    AsyncPipe
  ]
})
export class GlistContainerComponent extends AbstractRedirectComponent {
  recipes$ = this.glistFacadeService.recipesIds$.pipe(switchMap((ids) => this.recipeFacadeService.getRecipesByIds(ids)));
  ingredients$ = this.glistFacadeService.ingredients$;

  constructor(
    private glistFacadeService: GlistFacadeService,
    private recipeFacadeService: RecipeFacadeService,
    private router: Router,
    userFacadeService: UserFacadeService
  ) {
    super(userFacadeService.isUserSignedInAfterAttempt$.pipe(map((isSignedIn) => !isSignedIn)));
    this.glistFacadeService.getUserGlist();
  }

  doRedirect(): void {
    this.router.navigate(['dashboard']);
  }

  public addNewIngredientToGlist(ingredient: Ingredient): void {
    this.glistFacadeService.addIngredientToGlist(ingredient);
  }

  public removeIngredientFromGlist(ingredient: Ingredient): void {
    this.glistFacadeService.deleteIngredientFromGlist(ingredient);
  }

  public clearGlist(): void {
    this.glistFacadeService.clearGlist();
  }

  public saveNewIngredientList(ingredients: Ingredient[]) {
    this.glistFacadeService.changeIngredientOrder(ingredients);
  }
}
