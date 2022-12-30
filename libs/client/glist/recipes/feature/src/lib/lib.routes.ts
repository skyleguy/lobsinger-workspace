import { Route } from '@angular/router';

import { RecipeDetailsComponent } from '@lob/client/glist/recipes/ui';

import { RecipeContainerComponent } from './components/recipe-container/recipe-container.component';

export const clientGlistRecipesFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: RecipeContainerComponent },
  { path: ':id', pathMatch: 'full', component: RecipeDetailsComponent }
];
