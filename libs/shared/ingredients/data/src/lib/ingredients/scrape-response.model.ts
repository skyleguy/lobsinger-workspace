import { Ingredient } from './ingredient.model';

export class ScrapeResponse {
  ingredients!: Ingredient[];
  directions!: string[];
  title!: string;
}
