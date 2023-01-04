import { Ingredient } from '@lob/client/glist/recipes/data';
import { FirestoreData } from '@lob/client/shared/firebase/data';

export interface Glist extends FirestoreData {
  recipes: string[];
  ingredients: Ingredient[];
}
