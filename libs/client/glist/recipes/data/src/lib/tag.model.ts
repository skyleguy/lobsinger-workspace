export type TagType = 'Cuisine' | 'Dish' | 'Diet' | 'Other';

export interface Tag {
  value: string;
  type: TagType;
}
