export type TagType = 'Cusine' | 'Dish' | 'KeyIngredients';

export interface Tag {
  value: string;
  type: TagType;
}
