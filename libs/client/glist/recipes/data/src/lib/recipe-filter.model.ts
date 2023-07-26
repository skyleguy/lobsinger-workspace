export class RecipeFilter {
  constructor(public keyword = '', public dishTypes: string[] = [], public cuisineTypes: string[] = [], public dietTypes: string[] = []) {}
}
