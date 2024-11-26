import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initializeApp } from 'firebase/app';

import { AppContainerComponent } from '@lob/client/shared/layout/ui';

@Component({
  standalone: true,
  imports: [RouterModule, AppContainerComponent],
  selector: 'aat-root',
  template: `
    <shared-layout-ui-app-container [isSidebar]="false">
      <ng-container nav>
        <span nav>Advantage Asset Tracker</span>
        <span>icon</span>
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

  private firebaseConfig = {
    apiKey: 'AIzaSyBIRW-yEJo94-F2HB1Assiz9oKCkTKZ1oQ',
    authDomain: 'qr-reader-352914.firebaseapp.com',
    projectId: 'qr-reader-352914',
    storageBucket: 'qr-reader-352914.firebasestorage.app',
    messagingSenderId: '1043209938754',
    appId: '1:1043209938754:web:cc40a950203f9fc2fa4adb',
    measurementId: 'G-0NJLDHTZQV'
  };

  // Initialize Firebase
  private app = initializeApp(this.firebaseConfig);
  // private analytics = getAnalytics(app);
}
