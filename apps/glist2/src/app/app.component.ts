import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TabMenuItem } from '@lob/client/shared/layout/data';
import { AppContainerComponent } from '@lob/client/shared/layout/ui';

@Component({
  imports: [RouterModule, AppContainerComponent],
  selector: 'glist-root',
  template: `
    <shared-layout-ui-app-container [isSidebarAvailable]="false" [isMainBodyScrollable]="false" [tabs]="tabs()">
      <ng-container main-content>
        <div class="w-full h-full overflow-auto p-3">
          <router-outlet></router-outlet>
        </div>
      </ng-container>
    </shared-layout-ui-app-container>
  `
})
export class AppComponent {
  tabs = signal<TabMenuItem[]>([
    {
      label: 'Home',
      icon: 'fa-home',
      link: 'home'
    },
    {
      label: 'Recipes',
      icon: 'fa-folder',
      link: 'recipes'
    },
    {
      label: 'Meal Plan',
      icon: 'fa-calendar-days',
      link: 'meal-plan'
    },
    {
      label: 'Glist',
      icon: 'fa-list',
      link: 'glist'
    }
  ]);
}
