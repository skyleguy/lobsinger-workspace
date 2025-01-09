import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { favoritedRecipeText, Recipe, unfavoritedRecipeText } from '@lob/client/glist/recipes/data';

@Component({
    selector: 'glist-recipe-card',
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
    imports: [MatCardModule, MatChipsModule, MatButtonModule, MatIconModule, NgTemplateOutlet, TitleCasePipe]
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
