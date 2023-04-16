import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, Output, ViewChildren } from '@angular/core';

import { Recipe } from '@lob/client/glist/recipes/data';
import { Ingredient } from '@lob/shared/ingredients/data';

@Component({
  selector: 'glist-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnChanges {
  @ViewChildren(HTMLInputElement)
  ingredientInputs!: [HTMLInputElement];

  @Input()
  recipes: Recipe[] = [];
  @Input()
  ingredients: Ingredient[] = [];

  @Output()
  newIngredient = new EventEmitter<Ingredient>();
  @Output()
  ingredientChecked = new EventEmitter<Ingredient>();

  totalIngredients: Ingredient[] = [];

  public ngOnChanges(): void {
    this.calculateAllIngredients();
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.totalIngredients, event.previousIndex, event.currentIndex);
  }

  public validateNewIngredient(newIngredientName: string, newIngredientValue: string): void {
    if (newIngredientName?.length > 0 && newIngredientValue?.length > 0) {
      this.newIngredient.next(this.createIngredientFromInputs(newIngredientName, newIngredientValue));
      this.ingredientInputs.forEach((input) => {
        input.value = '';
      });
    }
  }

  private createIngredientFromInputs(name: string, value: string): Ingredient {
    const matches = value.match(/([0-9/.]*)\s(\w*)/);
    if (matches?.length === 3) {
      return { name, amount: matches[1], unit: matches[2] };
    }
    return { name, amount: value };
  }

  private calculateAllIngredients(): void {
    const ingredientsFromRecipes: Ingredient[] =
      this.recipes
        ?.reduce((accumulator: Ingredient[], current: Recipe): Ingredient[] => [...accumulator, ...current.ingredients], [])
        ?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
    this.totalIngredients = [...ingredientsFromRecipes, ...this.ingredients];
  }
}
