import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Asset, isAssetValid } from '@lob/client/aat/asset-track/data';
import { GoogleLocationService } from '@lob/client/aat/asset-track/data-access';
import { AssetCardComponent, AssetFormComponent } from '@lob/client/aat/asset-track/ui';

@Component({
  selector: 'aat-asset-track-feature-asset-track-container',
  standalone: true,
  imports: [MatIcon, MatFabButton, AssetFormComponent, AssetCardComponent, RouterLink],
  template: `
    <div class="h-full w-full flex flex-col gap-3">
      @if (isValid()) {
        <button mat-fab aria-label="Back button to return to scanner" routerLink="/scan">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <div class="grow flex flex-col gap-3 md:items-center md:justify-center md:mx-auto">
          @if (locationAjax().data; as currentAddress) {
            <span>Current Address: {{ currentAddress }}</span>
          }
          <aat-asset-track-ui-asset-card class="w-full" [asset]="asset()"></aat-asset-track-ui-asset-card>
          <aat-asset-track-ui-asset-form [isLocationLoading]="locationAjax().loading"></aat-asset-track-ui-asset-form>
          <div class="w-full flex justify-center items-center gap-3 mt-auto md:mt-0 pb-3">
            <button mat-fab extended>
              <mat-icon>language</mat-icon>
              Check-in
            </button>
            <button mat-fab extended>
              <mat-icon>send</mat-icon>
              Check-out
            </button>
          </div>
        </div>
      } @else {
        <span
          >Invalid asset name or asset id! You can try to
          <span>
            <a routerLink="/scan"> Scan Again?</a>
          </span>
        </span>
      }
    </div>
  `
})
export class AssetTrackContainerComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly googleLocationService = inject(GoogleLocationService);

  private paramMap = toSignal(this.activatedRoute.paramMap);

  protected asset = computed(
    () =>
      ({
        assetId: this.paramMap()?.get('assetId'),
        assetName: this.paramMap()?.get('assetName')
      }) as Asset
  );
  protected isValid = computed(() => isAssetValid(this.asset()));
  protected locationAjax = this.googleLocationService.getLocation();
}
