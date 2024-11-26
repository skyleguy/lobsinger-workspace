import { NgClass } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Result, Exception } from '@zxing/library';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'aat-qr-code-ui-qr-scanner',
  standalone: true,
  imports: [ZXingScannerModule, MatProgressSpinnerModule, NgClass],
  template: `
    <div class="h-full w-full flex flex-col p-3">
      <div class="border-b-2 border-white flex items-center justify-center">
        <span class="text-white">Scan the QR Code in order to track the asset.</span>
      </div>
      <div class="grow flex items-center justify-center flex-col">
        @if (!camFound()) {
          <mat-spinner class="grow"></mat-spinner>
        }
        <zxing-scanner
          class="shrink"
          [ngClass]="{
            'h-0': !camFound()
          }"
          previewFitMode="fill"
          (scanComplete)="scanSuccess($event)"
          (scanError)="scanError($event)"
          (scanFailure)="scanError($event)"
          (camerasFound)="camFound.set(true)"
        ></zxing-scanner>
      </div>
    </div>
  `
})
export class QrScannerComponent {
  private readonly dialogRef = inject(MatDialogRef<QrScannerComponent>);

  onScanComplete = output<string>();
  onScanError = output<Error | Exception>();

  camFound = signal(false);

  scanSuccess(result: Result) {
    if (result) {
      this.onScanComplete.emit(result.getText());
      this.dialogRef?.close(result.getText());
    }
  }

  scanError(error: Error | Exception | undefined) {
    if (error) {
      this.onScanError.emit(error);
    }
  }
}
