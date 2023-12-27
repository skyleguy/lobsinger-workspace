import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { LetDirective } from '@ngrx/component';

import { ClientGlistGlistsDataAccessModule } from '@lob/client/glist/glists/data-access';
import { IngredientsListComponent } from '@lob/client/glist/glists/ui';
import { ClientGlistRecipesDataAccessModule } from '@lob/client/glist/recipes/data-access';
import { RecipeCardComponent } from '@lob/client/glist/recipes/ui';

import { GlistContainerComponent } from './components/glist-container/glist-container.component';
import { clientGlistGlistsFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    ClientGlistGlistsDataAccessModule,
    ClientGlistRecipesDataAccessModule,
    RouterModule.forChild(clientGlistGlistsFeatureRoutes),
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    LetDirective,
    IngredientsListComponent,
    RecipeCardComponent
  ],
  declarations: [GlistContainerComponent]
})
export class ClientGlistGlistsFeatureModule {}
