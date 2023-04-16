import { FirestoreData, UserAttachedData } from '@lob/client/shared/firebase/data';
import { Ingredient } from '@lob/shared/ingredients/data';

import { Tag } from './tag.model';

export interface Recipe extends FirestoreData, UserAttachedData {
  title: string;
  ingredients: Ingredient[];
  directions: string[];
  tags?: Tag[];
  description?: string;
  isFavorited?: boolean;
  image?: string;
  toolsNeeded?: string[];
  servingSize?: string;
  prepCookTime?: string;
  link?: string;
  creationTime?: Date;
}
