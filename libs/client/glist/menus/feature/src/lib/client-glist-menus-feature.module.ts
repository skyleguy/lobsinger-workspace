import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuContainerComponent } from './components/menu-container/menu-container.component';
import { clientGlistMenusFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(clientGlistMenusFeatureRoutes)],
  declarations: [MenuContainerComponent],
})
export class ClientGlistMenusFeatureModule {}
