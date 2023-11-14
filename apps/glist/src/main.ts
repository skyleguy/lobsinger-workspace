import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, inject } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router, Routes, provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { map } from 'rxjs';

import { ClientSharedAuthDataAccessModule, UserFacadeService } from '@lob/client/shared/auth/data-access';
import { DeviceModule } from '@lob/client/shared/device/data-access';
import { ClientSharedFirebaseDataAccessModule } from '@lob/client/shared/firebase/data-access';
import { ClientSharedMobileUtilitiesDataAccessModule } from '@lob/client/shared/mobile/utilities/data-access';

import { AppComponent } from './app/app.component';

const isSignedIn = () => {
  const facadeService: UserFacadeService = inject(UserFacadeService);
  const router = inject(Router);
  return facadeService.isUserSignedInAfterAttempt$.pipe(
    map((isSignedIn) => {
      if (isSignedIn) {
        return true;
      } else {
        return router.parseUrl('/dashboard');
      }
    })
  );
};

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@lob/client/glist/dashboard/feature').then((m) => m.ClientGlistDashboardFeatureModule)
  },
  {
    path: 'recipes',
    canActivate: [isSignedIn],
    loadChildren: () => import('@lob/client/glist/recipes/feature').then((m) => m.ClientGlistRecipesFeatureModule)
  },
  {
    path: 'menus',
    canActivate: [isSignedIn],
    loadChildren: () => import('@lob/client/glist/menus/feature').then((m) => m.ClientGlistMenusFeatureModule)
  },
  {
    path: 'glists',
    canActivate: [isSignedIn],
    loadChildren: () => import('@lob/client/glist/glists/feature').then((m) => m.ClientGlistGlistsFeatureModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

// TODO look into getting rid of more modules here
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      DeviceModule.forRoot(),
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        serialize: true
      }),
      ClientSharedFirebaseDataAccessModule.forRoot({
        firebaseOptions: {
          apiKey: 'AIzaSyADdudZWW-lO8qdTX5-oza_kvcjLGYMteY',
          authDomain: 'glist-aed62.firebaseapp.com',
          projectId: 'glist-aed62',
          storageBucket: 'glist-aed62.appspot.com',
          messagingSenderId: '655452293628',
          appId: '1:655452293628:web:7e64fd6a67257d327e8a79',
          measurementId: 'G-V69BPDWWPB'
        }
      }),
      ClientSharedMobileUtilitiesDataAccessModule,
      ClientSharedAuthDataAccessModule
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
