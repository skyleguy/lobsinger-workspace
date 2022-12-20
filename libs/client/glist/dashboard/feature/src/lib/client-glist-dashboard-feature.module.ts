import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/glint-dashboard.component';
import { clientGlistDashboardFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientGlistDashboardFeatureRoutes),
  ],
  declarations: [DashboardComponent],
})
export class ClientGlistDashboardFeatureModule {}
