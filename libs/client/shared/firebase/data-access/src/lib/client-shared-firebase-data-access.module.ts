import { ModuleWithProviders, NgModule, inject } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FirebaseOptions } from 'firebase/app';

import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';

import { FirebaseAppFacadeService } from './services';
import { FirebaseAppEffects, firebaseAppSliceName, slice } from './services/+state';

export interface FirebaseModuleOptions {
  firebaseOptions: FirebaseOptions;
}

@NgModule({
  imports: [StoreModule.forFeature(firebaseAppSliceName, slice.reducer), EffectsModule.forFeature([FirebaseAppEffects])]
})
export class ClientSharedFirebaseDataAccessModule {
  constructor() {
    const firebaseAppFacadeService = inject(FirebaseAppFacadeService);
    firebaseAppFacadeService.getFirebaseApp();
  }
  static forRoot(options?: FirebaseModuleOptions): ModuleWithProviders<ClientSharedFirebaseDataAccessModule> {
    return {
      ngModule: ClientSharedFirebaseDataAccessModule,
      providers: [
        {
          provide: FirebaseOptionsToken,
          useValue: options?.firebaseOptions
        }
      ]
    };
  }
}
