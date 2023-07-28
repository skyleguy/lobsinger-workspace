import { Ingredient } from './ingredient.model';

export class ScrapeResponse {
  ingredients!: Ingredient[];
  directions!: string[];
  title!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image!: any;
}
