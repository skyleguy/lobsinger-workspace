import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Asset, isAssetValid } from '@lob/client/aat/asset-track/data';
import { AssetManagerService, GoogleLocationService } from '@lob/client/aat/asset-track/data-access';
import { AssetCardComponent, AssetFormComponent } from '@lob/client/aat/asset-track/ui';
import { UserStore } from '@lob/client/shared/auth/data-access';
import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

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
          <aat-asset-track-ui-asset-card class="w-full" [asset]="asset()"></aat-asset-track-ui-asset-card>
          <aat-asset-track-ui-asset-form [currentLocation]="currentLocation()"></aat-asset-track-ui-asset-form>
          <div class="w-full flex justify-center items-center gap-3 mt-auto md:mt-0 pb-3">
            <button mat-fab extended (click)="checkIn()">
              <mat-icon>language</mat-icon>
              Check-in
            </button>
            <button mat-fab extended (click)="checkOut()">
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
export class AssetTrackContainerComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly googleLocationService = inject(GoogleLocationService);
  private readonly userStore = inject(UserStore);
  private readonly assetManagerService = inject(AssetManagerService);
  private readonly router = inject(Router);

  private assetFormComponent = viewChild(AssetFormComponent);
  private paramMap = toSignal(this.activatedRoute.paramMap);

  protected asset = computed(
    () =>
      ({
        assetId: this.paramMap()?.get('assetId'),
        assetName: this.paramMap()?.get('assetName')
      }) as Asset
  );
  protected isValid = computed(() => isAssetValid(this.asset()));
  protected currentLocation = signal<AjaxState<string | null>>(createAjaxState<string | null>(null, true));

  public ngOnInit() {
    this.getLocation();
  }

  public checkIn() {
    console.log('checking in');
  }

  public checkOut() {
    const assetFormValue = this.assetFormComponent()?.assetForm.value;
    const request = {
      address: assetFormValue?.currentAddress ?? '',
      roomLocation: assetFormValue?.roomLocation ?? '',
      inspector: this.userStore.userData()?.name?.split(' ')?.[0] ?? '',
      assetName: this.asset().assetName ?? '',
      assetId: this.asset().assetId ?? ''
    };
    this.assetManagerService.checkOutAsset(request).subscribe({
      next: () => {
        this.router.navigate(['scan']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private getLocation() {
    this.googleLocationService.getLocationFunction().subscribe({
      next: (res) => {
        this.currentLocation.set(createAjaxState(res));
      },
      error: (err) => {
        this.currentLocation.set(createAjaxState(null, false, err));
      }
    });
  }
}
