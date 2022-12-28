import { Component } from '@angular/core';

@Component({
  selector: 'glist-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {
  readonly ingredients = [
    'Carrots peeled and sliced into 4-inch pieces',
    'Sourdough bread',
    'Fresh Ginger',
    'Salt',
    'Carrots',
    'Cucumber Diced',
    'Cashew Yogurt',
    'Tofu',
    'Pepper',
    'Yellow Onion',
    'Curry Powder',
    'Olive Oil',
    'Lettuce',
    'Red Onion'
  ];
  readonly directions = [
    'Preheat the oven to 400°F. Trim and quarter the Brussels sprouts. Trim and thinly slice the mini sweet peppers. Roughly chop the cilantro leaves and stems. Drain and rinse the black beans.',
    'Heat 1 tbsp vegetable oil in a large nonstick skillet over medium-high heat. Add quartered Brussels sprouts and a pinch of salt and pepper. Cook until lightly browned, 8 to 10 minutes. Place a small saucepan over medium-high heat. Add black beans, ¼ cup water, and a pinch of salt, and cook until hot. Mash with a fork.',
    'Wrap corn tortillas in foil and warm in the oven, 3 to 4 minutes. Top with mashed black beans, charred Brussels sprouts, sliced mini sweet peppers, and chopped cilantro. Drizzle with spicy peanut sauce.'
  ];
}
