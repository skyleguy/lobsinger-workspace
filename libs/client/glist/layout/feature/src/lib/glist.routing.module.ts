import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GlistRoutingModule {}
