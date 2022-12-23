import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RecipeEffects, slice } from './+state';
import { RecipeFacadeService } from './+state/recipe.facade.service';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(slice.name, slice.reducer), EffectsModule.forFeature([RecipeEffects])],
  providers: [RecipeFacadeService]
})
export class ClientGlistRecipesDataAccessModule {}
