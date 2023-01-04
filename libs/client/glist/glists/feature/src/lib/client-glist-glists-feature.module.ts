import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { ClientGlistGlistsDataAccessModule } from '@lob/client/glist/glists/data-access';
import { ClientGlistGlistsUiModule } from '@lob/client/glist/glists/ui';
import { ClientGlistRecipesUiModule } from '@lob/client/glist/recipes/ui';

import { GlistContainerComponent } from './components/glist-container/glist-container.component';
import { clientGlistGlistsFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    ClientGlistGlistsDataAccessModule,
    ClientGlistGlistsUiModule,
    ClientGlistRecipesUiModule,
    RouterModule.forChild(clientGlistGlistsFeatureRoutes),
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  declarations: [GlistContainerComponent]
})
export class ClientGlistGlistsFeatureModule {}
