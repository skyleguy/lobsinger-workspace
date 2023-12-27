import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, Output, ViewChildren } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Recipe } from '@lob/client/glist/recipes/data';
import { Ingredient } from '@lob/shared/ingredients/data';

@Component({
  selector: 'glist-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss'],
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatCheckboxModule, MatIconModule, MatDividerModule]
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
  @Output()
  ingredientOrderChange = new EventEmitter<Ingredient[]>();

  currentIngredients: Ingredient[] = [];

  public ngOnChanges(): void {
    this.currentIngredients = [...this.ingredients];
  }

  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.currentIngredients, event.previousIndex, event.currentIndex);
    this.ingredientOrderChange.emit(this.currentIngredients);
  }

  public handleIngredientChecked(ingredient: Ingredient, index: number): void {
    this.currentIngredients.splice(index, 1);
    this.ingredientChecked.next(ingredient);
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
}
