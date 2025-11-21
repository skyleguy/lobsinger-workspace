import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { AppContainerComponent, SidebarComponent } from '@lob/client/shared/layout/ui';
import { ThemeTogglerComponent } from '@lob/client/shared/theme/ui';

@Component({
  selector: 'home-root',
  imports: [AppContainerComponent, ThemeTogglerComponent, SidebarComponent],
  template: `
    <shared-layout-ui-app-container>
      <ng-container nav>
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-home"></i>
          <h2>Smart Home</h2>
        </div>
        <shared-theme-ui-theme-toggler></shared-theme-ui-theme-toggler>
      </ng-container>
      <ng-container sidebar>
        <shared-layout-ui-sidebar [items]="items"> </shared-layout-ui-sidebar>
      </ng-container>
      <ng-container main-content> content </ng-container>
    </shared-layout-ui-app-container>
  `
})
export class AppComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-home',
      routerLink: '/home'
    },
    {
      separator: true
    },
    {
      label: 'Dog',
      icon: 'fa-solid fa-dog',
      routerLink: '/dog'
    },
    {
      separator: true
    },
    {
      label: 'Lights',
      icon: 'fa-solid fa-lightbulb',
      routerLink: '/light'
    },
    {
      separator: true
    }
  ];
}
