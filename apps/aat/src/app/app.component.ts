import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import { AppContainerComponent } from '@lob/client/shared/layout/ui';

import { environment } from '../environments/environment';

@Component({
  standalone: true,
  imports: [RouterModule, AppContainerComponent, MatToolbar, MatIcon],
  selector: 'aat-root',
  template: `
    <shared-layout-ui-app-container [isSidebarAvailable]="false">
      <ng-container nav>
        <mat-toolbar color="primary">
          <span nav>Advantage Asset Tracker</span>
          <span class="flex grow shrink"></span>
          <mat-icon>account_circle</mat-icon>
        </mat-toolbar>
      </ng-container>
      <ng-container main-content>
        <div class="w-full h-full overflow-auto p-3">
          <router-outlet></router-outlet>
        </div>
      </ng-container>
    </shared-layout-ui-app-container>
  `
})
export class AppComponent {
  title = 'aat';

  // Initialize Firebase
  private app = initializeApp(environment.firebase);
  private analytics = getAnalytics(this.app);
}
