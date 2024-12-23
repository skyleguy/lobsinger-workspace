import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';
import { AppContainerComponent } from '@lob/client/shared/layout/ui';
import { UserAvatarComponent } from '@lob/client-shared-auth-feature';

@Component({
  standalone: true,
  imports: [RouterModule, AppContainerComponent, MatToolbar, UserAvatarComponent],
  selector: 'aat-root',
  template: `
    <shared-layout-ui-app-container [isSidebarAvailable]="false">
      <ng-container nav>
        <mat-toolbar color="primary">
          <span nav>Advantage Asset Tracker</span>
          <span class="flex grow shrink"></span>
          <client-shared-auth-feature-user-avatar></client-shared-auth-feature-user-avatar>
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
  private readonly firebaseAppStore = inject(FirebaseAppStore);

  constructor() {
    this.firebaseAppStore.initializeApp();
  }
}
