import { Recipe } from '@lob/client/glist/recipes/data';
import { FirestoreData } from '@lob/client/shared/firebase/data';

export interface Menu extends FirestoreData {
  title: string;
  recipes: Recipe[];
}
