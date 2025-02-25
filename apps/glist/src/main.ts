import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, inject } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { map } from 'rxjs';

import { GlistEffects, slice as glistSlice } from '@lob/client/glist/glists/data-access';
import { RecipeEffects, slice as recipeSlice } from '@lob/client/glist/recipes/data-access';
import { UserEffects, UserFacadeService, slice as userSlice } from '@lob/client/shared/auth/data-access';
import { provideDevice } from '@lob/client/shared/device/data-access';
import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';
import { FirebaseAppEffects, slice as firebaseSlice } from '@lob/client/shared/firebase/data-access';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

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
    loadChildren: () => import('@lob/client/glist/dashboard/feature').then((m) => m.clientGlistDashboardFeatureRoutes)
  },
  {
    path: 'recipes',
    canActivate: [isSignedIn],
    providers: [provideState(recipeSlice.name, recipeSlice.reducer), provideEffects(RecipeEffects)],
    loadChildren: () => import('@lob/client/glist/recipes/feature').then((m) => m.clientGlistRecipesFeatureRoutes)
  },
  {
    path: 'menus',
    canActivate: [isSignedIn],
    loadChildren: () => import('@lob/client/glist/menus/feature').then((m) => m.clientGlistMenusFeatureRoutes)
  },
  {
    path: 'glists',
    canActivate: [isSignedIn],
    providers: [
      provideState(glistSlice.name, glistSlice.reducer),
      provideState(recipeSlice.name, recipeSlice.reducer),
      provideEffects(GlistEffects, RecipeEffects)
    ],
    loadChildren: () => import('@lob/client/glist/glists/feature').then((m) => m.clientGlistGlistsFeatureRoutes)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

// TODO look into getting rid of more modules here
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    { provide: FirebaseOptionsToken, useValue: environment.firebase },
    provideDevice(),
    provideStore({}),
    provideState(firebaseSlice.name, firebaseSlice.reducer),
    provideState(userSlice.name, userSlice.reducer),
    provideEffects(UserEffects, FirebaseAppEffects),
    provideStoreDevtools({
      maxAge: 25,
      serialize: true
    }),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withComponentInputBinding())
  ]
}).catch((err) => console.error(err));
