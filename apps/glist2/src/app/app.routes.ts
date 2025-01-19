import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'recipes',
    loadChildren: () => import('@lob/client/glist2/recipe/feature').then((lib) => lib.recipeRoutes)
  },
  {
    path: 'home',
    loadChildren: () => import('@lob/client/glist2/home/feature').then((lib) => lib.homeRoutes)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
