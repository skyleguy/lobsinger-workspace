import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { QrScannerComponent } from '@lob/client/aat/qr-code/ui';

@Component({
  selector: 'aat-qr-code-feature-qr-code-container',
  standalone: true,
  imports: [],
  template: `<div class="h-full w-full flex flex-col">
    <div class="w-full flex items-center justify-center">
      <button class="border-2 border-black rounded-md p-3 hover:bg-black/35" (click)="openQRDialog()">Open QR Scanner</button>
    </div>
  </div>`
})
export class QrCodeContainerComponent {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  openQRDialog() {
    const dialogRef = this.dialog.open(QrScannerComponent, {
      height: '50%',
      width: '50%'
    });
    dialogRef.afterClosed().subscribe((res) => {
      const url = new URL(res);
      console.log(url.pathname.split('/'));
      const [_, assetType, assetId] = url.pathname.split('/');
      if (assetType && assetId) {
        this.router.navigate([assetType, assetId]);
      }
    });
  }
}
