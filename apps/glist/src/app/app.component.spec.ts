import { Spectator, createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';

import { FirebaseService } from '@lob/client/shared/firebase/data-access';

import { AppComponent } from './app.component';
import { GlistContainerComponent } from './modules/glist-layout/components/glist-container/glist-app-container.component';
import { GlistContentComponent } from './modules/glist-layout/components/glist-content/glist-content.component';
import { GlistHeaderComponent } from './modules/glist-layout/components/glist-header/glist-header.component';
import { GlistSidebarComponent } from './modules/glist-layout/components/glist-sidebar/glist-sidebar.component';

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
      mockProvider(FirebaseService, {
        app: of(null)
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
