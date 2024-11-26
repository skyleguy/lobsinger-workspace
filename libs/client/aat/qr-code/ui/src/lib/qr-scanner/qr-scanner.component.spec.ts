import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { QrScannerComponent } from './qr-scanner.component';

describe('QrScannerComponent', () => {
  let spectator: Spectator<QrScannerComponent>;
  const createComponent = createComponentFactory(QrScannerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
