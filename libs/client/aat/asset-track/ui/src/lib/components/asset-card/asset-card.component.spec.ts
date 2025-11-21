import { provideRouter } from '@angular/router';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { AssetCardComponent } from './asset-card.component';

describe('AssetCardComponent', () => {
  let spectator: Spectator<AssetCardComponent>;
  const createComponent = createComponentFactory({
    component: AssetCardComponent,
    providers: [provideRouter([])]
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        asset: {
          assetId: '12',
          assetName: 'Radon'
        },
        backButtonRoute: '/scan'
      }
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
