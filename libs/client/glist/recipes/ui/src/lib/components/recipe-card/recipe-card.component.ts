import { Component, Input } from '@angular/core';

import { Recipe } from '@lob/client/glist/recipes/data';

@Component({
  selector: 'glist-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input()
  recipe!: Recipe;
}
