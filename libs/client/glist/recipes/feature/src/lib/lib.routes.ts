import { Route } from '@angular/router';

import { RecipeContainerComponent } from './components/recipe-container/recipe-container.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

export const clientGlistRecipesFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: RecipeContainerComponent },
  { path: ':id', pathMatch: 'full', component: RecipeDetailsComponent }
];
