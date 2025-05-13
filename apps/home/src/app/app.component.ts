import { Component } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { AppContainerComponent } from '@lob/client/shared/layout/ui';
import { ThemeTogglerComponent } from '@lob/client/shared/theme/ui';

@Component({
  selector: 'home-root',
  imports: [AppContainerComponent, ToggleButtonModule, ThemeTogglerComponent],
  template: `
    <shared-layout-ui-app-container [isMaterialTheming]="false">
      <ng-container nav>
        <h2>Smart Home</h2>
        <shared-theme-ui-theme-toggler></shared-theme-ui-theme-toggler>
      </ng-container>
      <ng-container sidebar> sidebar </ng-container>
      <ng-container main-content> content </ng-container>
    </shared-layout-ui-app-container>
  `
})
export class AppComponent {}
