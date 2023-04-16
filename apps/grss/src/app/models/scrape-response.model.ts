import { Ingredient } from '@lob/shared/ingredients/data';

export class ScrapeResponse {
  ingredients: Ingredient[];
  directions: string[];
  title: string;
}
