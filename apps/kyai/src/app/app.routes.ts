import { Route } from '@angular/router';

import { MainContainerComponent } from '@lob/client/kyai/layout/feature';

export const appRoutes: Route[] = [
  {
    path: 'home',
    pathMatch: 'full',
    component: MainContainerComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
