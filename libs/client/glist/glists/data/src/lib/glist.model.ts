import { FirestoreData } from '@lob/client/shared/firebase/data';
import { Ingredient } from '@lob/shared/ingredients/data';

export interface Glist extends FirestoreData {
  recipes: string[];
  ingredients: Ingredient[];
}
