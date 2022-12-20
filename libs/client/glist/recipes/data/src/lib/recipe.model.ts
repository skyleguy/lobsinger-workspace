import { Ingredient } from './ingedient.model';
import { Tag } from './tag.model';

export interface Recipe {
  title: string;
  ingredients: Ingredient[];
  directions: string[];
  tags?: Tag[];
  description?: string;
}
