import { Route } from '@angular/router';

import { MysteryContainerComponent } from '@lob/client/kyai/mystery/feature';

export const appRoutes: Route[] = [
  {
    path: 'home',
    pathMatch: 'full',
    component: MysteryContainerComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
