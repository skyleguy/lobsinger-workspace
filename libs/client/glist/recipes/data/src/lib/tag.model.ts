export type TagType = 'Cusine' | 'Dish' | 'Diet' | 'Other';

export interface Tag {
  value: string;
  type: TagType;
}
