import { Component, OnInit } from '@angular/core';

import { Recipe } from '@lob/client/glist/recipes/data';

@Component({
  selector: 'glist-recipe-container',
  templateUrl: './recipe-container.component.html',
  styleUrls: ['./recipe-container.component.scss'],
})
export class RecipeContainerComponent implements OnInit {
  recipes: Recipe[] = [];

  public ngOnInit(): void {
    this.recipes = [
      {
        title: 'Buffalo Cauliflower Bites',
        directions: [
          'Cut up the cauliflower into small pieces',
          'Bake the cauliflower for 30 minutes on 350 degrees in the oven',
          'while the cauliflower bakes make the sauce',
          'when cauliflower is done combine and serve!',
        ],
        ingredients: [
          { name: 'Cauliflower', amount: 1 },
          { name: 'Buffalo Sauce', amount: 4, unit: 'Tablespoon' },
        ],
      },
      {
        title: 'Gnocchi Alfredo',
        directions: [
          'Bring water to boil',
          'cut broccolli into small pieces',
          'Combine sauce ingredients into blender and blend until smooth',
          'cook gnocci to specifications on packaging',
          'combine into one pot and serve!',
        ],
        ingredients: [
          {
            name: 'Broccolli',
            amount: 1,
          },
          {
            name: 'Gnocchi',
            amount: 1,
          },
          {
            name: 'Nutritional Yeast',
            amount: 4,
            unit: 'Tablespoon',
          },
        ],
      },
    ];
  }
}
