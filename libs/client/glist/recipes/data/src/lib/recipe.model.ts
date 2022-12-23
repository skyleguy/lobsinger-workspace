import { FirestoreData, UserAttachedData } from '@lob/client/shared/firebase/data';

import { Ingredient } from './ingedient.model';
import { Tag } from './tag.model';

export interface Recipe extends FirestoreData, UserAttachedData {
  title: string;
  ingredients: Ingredient[];
  directions: string[];
  tags?: Tag[];
  description?: string;
  isFavorited?: boolean;
}
