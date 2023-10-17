import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { userSliceName, slice, UserEffects } from './+state';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(userSliceName, slice.reducer), EffectsModule.forFeature([UserEffects])]
})
export class ClientSharedAuthDataAccessModule {}
