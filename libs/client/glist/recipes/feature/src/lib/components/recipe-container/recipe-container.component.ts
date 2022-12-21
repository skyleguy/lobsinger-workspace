import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

import { Recipe } from '@lob/client/glist/recipes/data';

@Component({
  selector: 'glist-recipe-container',
  templateUrl: './recipe-container.component.html',
  styleUrls: ['./recipe-container.component.scss'],
})
export class RecipeContainerComponent implements OnInit {
  recipes: Recipe[] = [];
  favoriteRecipes: Recipe[] = [];
  fakeRecipes: Recipe[] = [
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
      description: 'Simple and easy buffalo "wings" for all the vegan lovers',
      tags: [
        { value: 'spicy', type: 'Cusine' },
        { value: 'vegan', type: 'Cusine' },
        { value: 'game-day', type: 'Cusine' },
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
      description:
        'A soupy version of alfredo sauce with gnocchi swimming in it.',
      tags: [
        { value: 'spicy', type: 'Cusine' },
        { value: 'vegan', type: 'Cusine' },
        { value: 'game-day', type: 'Cusine' },
        { value: 'spicy', type: 'Cusine' },
        { value: 'vegan', type: 'Cusine' },
        { value: 'game-day', type: 'Cusine' },
        { value: 'spicy', type: 'Cusine' },
        { value: 'vegan', type: 'Cusine' },
        { value: 'game-day', type: 'Cusine' },
      ],
    },
    {
      title: 'Moroccan Chickpea',
      directions: [
        'boil water for potatoes',
        'chop potatoes into small 1 inch pieces',
        'add potatoes to boiling water for 10 minuts',
        'combine spices and chickpeas into skillet',
        'combine all over rice and serve',
      ],
      ingredients: [
        {
          name: 'potatoes',
          amount: 5,
        },
        {
          name: 'chickpeas',
          amount: 15,
          unit: 'ounces',
        },
        {
          name: 'spies',
          amount: 5,
          unit: 'sticks',
        },
      ],
      description:
        'A delicious morrocan stew made of potatoes, spices, and chick peas. Served over rice.',
      tags: [
        { value: 'spicy', type: 'Cusine' },
        { value: 'vegan', type: 'Cusine' },
        { value: 'game-day', type: 'Cusine' },
      ],
    },
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
      description: 'Simple and easy buffalo "wings" for all the vegan lovers',
      tags: [
        { value: 'spicy', type: 'Cusine' },
        { value: 'vegan', type: 'Cusine' },
        { value: 'game-day', type: 'Cusine' },
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
      description:
        'A soupy version of alfredo sauce with gnocchi swimming in it.',
      tags: [
        { value: 'spicy', type: 'Cusine' },
        { value: 'vegan', type: 'Cusine' },
        { value: 'game-day', type: 'Cusine' },
      ],
    },
    {
      title: 'Moroccan Chickpea',
      directions: [
        'boil water for potatoes',
        'chop potatoes into small 1 inch pieces',
        'add potatoes to boiling water for 10 minuts',
        'combine spices and chickpeas into skillet',
        'combine all over rice and serve',
      ],
      ingredients: [
        {
          name: 'potatoes',
          amount: 5,
        },
        {
          name: 'chickpeas',
          amount: 15,
          unit: 'ounces',
        },
        {
          name: 'spies',
          amount: 5,
          unit: 'sticks',
        },
      ],
      description:
        'A delicious morrocan stew made of potatoes, spices, and chick peas. Served over rice.',
      tags: [
        { value: 'spicy', type: 'Cusine' },
        { value: 'vegan', type: 'Cusine' },
        { value: 'game-day', type: 'Cusine' },
      ],
    },
  ];

  public ngOnInit(): void {
    this.getRecipes();
    this.getFakeRecipes();
  }

  private getRecipes(): void {
    of(this.fakeRecipes).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
    });
  }

  private getFakeRecipes(): void {
    of(this.fakeRecipes).subscribe({
      next: (recipes) => {
        this.favoriteRecipes = recipes;
      },
    });
  }
}
