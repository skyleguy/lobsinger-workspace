import { Spectator, createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { FirebaseApp } from 'firebase/app';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { FirebaseAppFacadeService } from '@lob/client/shared/firebase/data-access';
import {
  GlistContentComponent,
  GlistContainerComponent,
  GlistHeaderComponent,
  GlistSidebarComponent
} from '@lob/client-glist-layout-feature';

import { AppComponent } from './app.component';

const MOCKED_COMPONENTS = [
  MockComponent(GlistContentComponent),
  MockComponent(GlistContainerComponent),
  MockComponent(GlistHeaderComponent),
  MockComponent(GlistSidebarComponent)
];

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [...MOCKED_COMPONENTS],
    providers: [
      mockProvider(FirebaseAppFacadeService, {
        app$: of({} as FirebaseApp)
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
