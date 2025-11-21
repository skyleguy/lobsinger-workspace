import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { QrScannerComponent } from '@lob/client/aat/qr-code/ui';

@Component({
  selector: 'aat-qr-code-feature-qr-code-container',
  imports: [QrScannerComponent],
  template: `
    <div class="h-full w-full flex flex-col items-center md:justify-center" data-test="qr-code-container">
      <aat-qr-code-ui-qr-scanner (scanComplete)="routeToAsset($event)"></aat-qr-code-ui-qr-scanner>
    </div>
  `
})
export class QrCodeContainerComponent {
  private readonly router = inject(Router);

  protected routeToAsset(link: string) {
    const url = new URL(link);
    const [_, assetType, assetId] = url.pathname.split('/');
    if (assetType && assetId) {
      this.router.navigate([assetType, assetId]);
    }
  }
}
