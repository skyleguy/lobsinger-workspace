import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges } from '@angular/core';

import { Ingredient, Recipe } from '@lob/client/glist/recipes/data';

@Component({
  selector: 'glist-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnChanges {
  @Input()
  recipes: Recipe[] = [];
  @Input()
  ingredients: Ingredient[] = [];

  totalIngredients: Ingredient[] = [];

  public ngOnChanges(): void {
    this.calculateAllIngredients();
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.totalIngredients, event.previousIndex, event.currentIndex);
  }

  private calculateAllIngredients(): void {
    const ingredientsFromRecipes: Ingredient[] =
      this.recipes?.reduce((accumulator: Ingredient[], current: Recipe): Ingredient[] => [...accumulator, ...current.ingredients], []) ??
      [];
    this.totalIngredients = [...this.ingredients, ...ingredientsFromRecipes];
  }
}
