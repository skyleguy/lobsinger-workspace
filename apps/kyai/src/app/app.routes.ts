import { Route } from '@angular/router';

import { MainContainerComponent } from './main-container.component';

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
