import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Spectator, createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { FirebaseApp } from 'firebase/app';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { FirebaseAppFacadeService } from '@lob/client/shared/firebase/data-access';
import { GlistContainerComponent } from '@lob/client-glist-layout-feature';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [MatProgressSpinnerModule, MockComponent(GlistContainerComponent)],
    providers: [
      mockProvider(FirebaseAppFacadeService, {
        app$: of({} as FirebaseApp),
        appError$: of(null)
      }),
      mockProvider(UserFacadeService, {
        signUserIn: () => {
          //
        }
      })
    ]
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });
});
