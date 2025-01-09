import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { isNil } from 'lodash';
import { filter } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { FirebaseAppFacadeService } from '@lob/client/shared/firebase/data-access';
import { GlistContainerComponent } from '@lob/client-glist-layout-feature';

enum AppState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

@Component({
    selector: 'glist-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [MatProgressSpinnerModule, GlistContainerComponent]
})
export class AppComponent implements OnInit {
  appStateEnum: typeof AppState = AppState;
  appState: AppState = AppState.LOADING;

  constructor(
    private readonly firebaseAppFacadeService: FirebaseAppFacadeService,
    private readonly userFacadeService: UserFacadeService
  ) {
    firebaseAppFacadeService.getFirebaseApp();
  }

  ngOnInit(): void {
    this.firebaseAppFacadeService.app$.subscribe({
      next: (app) => {
        this.appState = AppState.LOADED;
        this.userFacadeService.signUserIn(app, true);
      }
    });

    this.firebaseAppFacadeService.appError$.pipe(filter((err) => !isNil(err))).subscribe({
      next: () => {
        this.appState = AppState.ERROR;
      }
    });
  }
}
