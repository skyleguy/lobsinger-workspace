import { NgClass } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Result, Exception } from '@zxing/library';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'aat-qr-code-ui-qr-scanner',
  standalone: true,
  imports: [ZXingScannerModule, MatProgressSpinnerModule, NgClass],
  template: `
    <div class="h-full w-full flex flex-col p-3 gap-3">
      <div class="flex items-center justify-center flex-col">
        @if (!camFound()) {
          <mat-spinner class="grow"></mat-spinner>
        }
        <zxing-scanner
          [ngClass]="{
            'h-0': !camFound()
          }"
          previewFitMode="fill"
          (scanComplete)="scannerSuccess($event)"
          (scanError)="scannerError($event)"
          (scanFailure)="scannerError($event)"
          (camerasFound)="camFound.set(true)"
        ></zxing-scanner>
      </div>
      <div class="border-b-2 border-white flex items-center justify-center">
        <p class="text-black">
          Center the QR Code in your device’s camera and hold it steady. If the scan is successful you will be redirected.
        </p>
      </div>
    </div>
  `
})
export class QrScannerComponent {
  scanComplete = output<string>();
  scanError = output<Error | Exception>();

  camFound = signal(false);

  scannerSuccess(result: Result) {
    if (result) {
      this.scanComplete.emit(result.getText());
    }
  }

  scannerError(error: Error | Exception | undefined) {
    if (error) {
      this.scanError.emit(error);
    }
  }
}
