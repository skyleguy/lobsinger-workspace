import { Route } from '@angular/router';

import { GlistContainerComponent } from './components/glist-container/glist-container.component';

export const clientGlistGlistsFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: GlistContainerComponent },
];
