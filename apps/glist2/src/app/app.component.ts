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
      icon: 'home',
      link: 'home'
    },
    {
      label: 'Recipes',
      icon: 'folder',
      link: 'recipes'
    },
    {
      label: 'Meal Plan',
      icon: 'calendar_today',
      link: 'meal-plan'
    },
    {
      label: 'Glist',
      icon: 'list',
      link: 'glist'
    }
  ]);
}
