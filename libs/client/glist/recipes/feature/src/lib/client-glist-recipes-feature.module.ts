import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { ClientGlistRecipesDataAccessModule } from '@lob/client/glist/recipes/data-access';
import { ClientGlistRecipesUiModule } from '@lob/client/glist/recipes/ui';

import { RecipeContainerComponent } from './components/recipe-container/recipe-container.component';
import { clientGlistRecipesFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    RouterModule.forChild(clientGlistRecipesFeatureRoutes),
    ClientGlistRecipesUiModule,
    ClientGlistRecipesDataAccessModule
  ],
  declarations: [RecipeContainerComponent]
})
export class ClientGlistRecipesFeatureModule {}
