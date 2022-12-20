import { Route } from '@angular/router';

import { DashboardComponent } from './components/dashboard/glint-dashboard.component';

export const clientGlistDashboardFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
];
