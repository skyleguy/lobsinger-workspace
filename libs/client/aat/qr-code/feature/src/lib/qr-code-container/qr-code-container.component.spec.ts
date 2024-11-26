import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { QrCodeContainerComponent } from './qr-code-container.component';

describe('QrCodeContainerComponent', () => {
  let spectator: Spectator<QrCodeContainerComponent>;
  const createComponent = createComponentFactory(QrCodeContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
