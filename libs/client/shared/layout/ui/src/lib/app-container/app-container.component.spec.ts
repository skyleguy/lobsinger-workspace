import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { AppContainerComponent } from './app-container.component';

describe('AppContainerComponent', () => {
  let spectator: Spectator<AppContainerComponent>;
  const createComponent = createComponentFactory(AppContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
