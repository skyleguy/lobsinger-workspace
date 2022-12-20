import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@lob/client/glist/dashboard/feature').then(
        (m) => m.ClientGlistDashboardFeatureModule
      ),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('@lob/client/glist/recipes/feature').then(
        (m) => m.ClientGlistRecipesFeatureModule
      ),
  },
  {
    path: 'menus',
    loadChildren: () =>
      import('@lob/client/glist/menus/feature').then(
        (m) => m.ClientGlistMenusFeatureModule
      ),
  },
  {
    path: 'glists',
    loadChildren: () =>
      import('@lob/client/glist/glists/feature').then(
        (m) => m.ClientGlistGlistsFeatureModule
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
