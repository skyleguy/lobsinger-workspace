import { Route } from '@angular/router';

import { MenuContainerComponent } from './components/menu-container/menu-container.component';

export const clientGlistMenusFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: MenuContainerComponent },
];
