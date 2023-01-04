import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GlistEffects } from './+state/glist.effects';
import { GlistFacadeService } from './+state/glist.facade.service';
import { slice } from './+state/glist.slice';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(slice.name, slice.reducer), EffectsModule.forFeature([GlistEffects])],
  providers: [GlistFacadeService]
})
export class ClientGlistGlistsDataAccessModule {}
