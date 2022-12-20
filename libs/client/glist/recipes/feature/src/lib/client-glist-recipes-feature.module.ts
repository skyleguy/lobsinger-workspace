import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipeContainerComponent } from './components/recipe-container/recipe-container.component';
import { clientGlistRecipesFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(clientGlistRecipesFeatureRoutes),
  ],
  declarations: [RecipeContainerComponent],
})
export class ClientGlistRecipesFeatureModule {}
