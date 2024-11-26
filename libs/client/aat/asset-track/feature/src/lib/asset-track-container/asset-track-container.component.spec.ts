import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { AssetTrackContainerComponent } from './asset-track-container.component';

describe('AssetTrackContainerComponent', () => {
  let spectator: Spectator<AssetTrackContainerComponent>;
  const createComponent = createComponentFactory(AssetTrackContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
