import { Component } from '@angular/core';
import { switchMap } from 'rxjs';

import { GlistFacadeService } from '@lob/client/glist/glists/data-access';
import { RecipeFacadeService } from '@lob/client/glist/recipes/data-access';
import { Ingredient } from '@lob/shared/ingredients/data';

@Component({
  selector: 'glist-glist-container',
  templateUrl: './glist-container.component.html',
  styleUrls: ['./glist-container.component.scss']
})
export class GlistContainerComponent {
  recipes$ = this.glistFacadeService.recipesIds$.pipe(switchMap((ids) => this.recipeFacadeService.getRecipesByIds(ids)));
  ingredients$ = this.glistFacadeService.ingredients$;

  constructor(private glistFacadeService: GlistFacadeService, private recipeFacadeService: RecipeFacadeService) {
    this.glistFacadeService.getUserGlist();
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
}
