import { Route } from '@angular/router';

import { RecipeContainerComponent } from './components/recipe-container/recipe-container.component';

export const clientGlistRecipesFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: RecipeContainerComponent },
  {
    path: ':id',
    pathMatch: 'full',
    loadChildren: () => import('./recipe-details.route').then((m) => m.recipeDetailsRoutes)
  }
];
