import { Component, EventEmitter, Input, Output } from '@angular/core';

import { favoritedRecipeText, Recipe, unfavoritedRecipeText } from '@lob/client/glist/recipes/data';

@Component({
  selector: 'glist-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  readonly favoritedRecipeText = favoritedRecipeText;
  readonly unfavoritedRecipeText = unfavoritedRecipeText;

  @Input({ required: true })
  recipe!: Recipe | null;

  @Output()
  favoriteClicked: EventEmitter<Recipe> = new EventEmitter();
  @Output()
  addToGlist: EventEmitter<Recipe> = new EventEmitter();
}
