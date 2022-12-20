import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlistContainerComponent } from './components/glist-container/glist-container.component';
import { clientGlistGlistsFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(clientGlistGlistsFeatureRoutes),
  ],
  declarations: [GlistContainerComponent],
})
export class ClientGlistGlistsFeatureModule {}
