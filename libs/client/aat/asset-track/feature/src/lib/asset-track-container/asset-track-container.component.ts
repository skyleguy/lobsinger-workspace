import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { GoogleLocationService } from '@lob/client/aat/asset-track/data-access';

@Component({
    selector: 'aat-asset-track-feature-asset-track-container',
    imports: [TitleCasePipe],
    template: `
    <div class="h-full w-full flex flex-col">
      @if (isValid()) {
        <h4>Asset Information</h4>
        <span>Asset Name: {{ assetName() | titlecase }}</span>
        <span>Asset Id: {{ assetId() }}</span>
        <br />
        <h4 class="cursor-pointer" (click)="getLocationInfo()">Location Information</h4>
        <br />
        <div class="w-full flex justify-center items-center gap-3">
          <button class="border-2 border-black p-3 rounded-md hover:bg-black/35">Return Home</button>
          <button class="border-2 border-black p-3 rounded-md hover:bg-black/35">Check Out</button>
        </div>
        @if (currentAddress()) {
          <span>Current Address: {{ currentAddress() }}</span>
        }
      } @else {
        <span
          >Invalid asset name or asset id! You can try to <span><a href="/scan">Scan Again?</a></span></span
        >
      }
    </div>
  `
})
export class AssetTrackContainerComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly googleLocationService = inject(GoogleLocationService);

  private paramMap = toSignal(this.activatedRoute.paramMap);
  protected assetName = computed(() => this.paramMap()?.get('assetName'));
  protected assetId = computed(() => this.paramMap()?.get('assetId'));
  protected isValid = computed(() => this.assetId() && this.assetName());
  protected currentAddress = signal<string | null>(null);

  getLocationInfo() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.googleLocationService.getCurrentAddress(latitude, longitude).subscribe({
          next: (currentAddress) => {
            console.log(currentAddress);
            this.currentAddress.set(currentAddress);
          },
          error: (err) => {
            this.currentAddress.set(null);
            console.error(err);
          }
        });
      },
      (error) => {
        console.error('Error obtaining location', error);
      },
      { enableHighAccuracy: true }
    );
  }
}
