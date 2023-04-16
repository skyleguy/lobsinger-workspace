import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RecipeEffects, slice } from './+state';
import { RecipeFacadeService } from './+state/recipe.facade.service';
import { RecipeScrapeService } from './recipe-scrape/recipe-scrape.service';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(slice.name, slice.reducer), EffectsModule.forFeature([RecipeEffects])],
  providers: [RecipeFacadeService, RecipeScrapeService]
})
export class ClientGlistRecipesDataAccessModule {}
