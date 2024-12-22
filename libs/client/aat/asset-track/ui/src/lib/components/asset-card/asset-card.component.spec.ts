import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { AssetCardComponent } from './asset-card.component';

describe('AssetCardComponent', () => {
  let spectator: Spectator<AssetCardComponent>;
  const createComponent = createComponentFactory(AssetCardComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
