import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import { AppContainerComponent } from '@lob/client/shared/layout/ui';

import { environment } from '../environments/environment';

@Component({
  standalone: true,
  imports: [RouterModule, AppContainerComponent],
  selector: 'aat-root',
  template: `
    <shared-layout-ui-app-container [isSidebar]="false">
      <ng-container nav>
        <span nav>Advantage Asset Tracker</span>
        <span>my-icon</span>
      </ng-container>
      <ng-container sidebar> i am not a t-rex </ng-container>
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
