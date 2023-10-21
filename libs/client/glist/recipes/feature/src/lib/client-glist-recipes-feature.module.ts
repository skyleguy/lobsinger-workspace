import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { ClientGlistGlistsDataAccessModule } from '@lob/client/glist/glists/data-access';
import { ClientGlistRecipesDataAccessModule } from '@lob/client/glist/recipes/data-access';
import { ClientGlistRecipesUiModule } from '@lob/client/glist/recipes/ui';
import { ClientSharedMobileUtilitiesDataAccessModule } from '@lob/client/shared/mobile/utilities/data-access';

import { RecipeContainerComponent } from './components/recipe-container/recipe-container.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeEditorComponent } from './components/recipe-editor/recipe-editor.component';
import { clientGlistRecipesFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule.forChild(clientGlistRecipesFeatureRoutes),
    FormsModule,
    ReactiveFormsModule,
    ClientSharedMobileUtilitiesDataAccessModule,
    ClientGlistRecipesUiModule,
    ClientGlistRecipesDataAccessModule,
    ClientGlistGlistsDataAccessModule
  ],
  declarations: [RecipeContainerComponent, RecipeDetailsComponent, RecipeEditorComponent]
})
export class ClientGlistRecipesFeatureModule {}
