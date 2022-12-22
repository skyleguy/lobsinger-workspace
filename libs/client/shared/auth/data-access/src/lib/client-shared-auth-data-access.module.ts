import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { userSliceName, slice, UserEffects } from './+state';
import { GoogleAuthProviderService } from './services';
import { UserFacadeService } from './services/user-facade/user.facade.service';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(userSliceName, slice.reducer), EffectsModule.forFeature([UserEffects])],
  providers: [GoogleAuthProviderService, UserFacadeService]
})
export class ClientSharedAuthDataAccessModule {}
