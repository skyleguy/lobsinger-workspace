import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
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
            <button mat-fab extended (click)="setUp()" class="flex-auto">
              <mat-icon>timer</mat-icon>
              Set Up
            </button>
            <button mat-fab extended (click)="pickUp()" class="flex-auto">
              <mat-icon>backup</mat-icon>
              Pick Up
            </button>
            <button mat-fab extended (click)="return()" class="flex-auto">
              <mat-icon>home</mat-icon>
              Return
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
  private readonly matSnackbar = inject(MatSnackBar);

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
  protected isLoading = signal(false);
  protected currentLocation = signal<AjaxState<string | null>>(createAjaxState<string | null>(null, true));

  public ngOnInit() {
    this.getLocation();
  }

  public pickUp() {
    this.assetManagerService
      .pickUp({
        assetName: this.asset().assetName ?? '',
        assetId: this.asset().assetId ?? '',
        inspector: this.userStore.userData()?.name?.split(' ')?.[0] ?? ''
      })
      .subscribe({
        next: () => {
          this.matSnackbar.open(`${this.asset().assetName} ${this.asset().assetId} successfully picked up!`);
        },
        error: (err) => {
          this.matSnackbar.open(
            `${this.asset().assetName} ${this.asset().assetId} failed to be picked up due to: ${JSON.stringify(err)}`,
            '',
            {
              panelClass: ['!bg-red-300', '!text-red-600']
            }
          );
        }
      });
  }

  public return() {
    this.assetManagerService
      .return({
        assetName: this.asset().assetName ?? '',
        assetId: this.asset().assetId ?? '',
        inspector: this.userStore.userData()?.name?.split(' ')?.[0] ?? ''
      })
      .subscribe({
        next: () => {
          this.matSnackbar.open(`${this.asset().assetName} ${this.asset().assetId} successfully returned home!`);
        },
        error: (err) => {
          this.matSnackbar.open(
            `${this.asset().assetName} ${this.asset().assetId} failed to be returned home due to: ${JSON.stringify(err)}`,
            '',
            {
              panelClass: ['!bg-red-300', '!text-red-600']
            }
          );
        }
      });
  }

  public setUp() {
    const assetFormValue = this.assetFormComponent()?.assetForm.value;
    const request = {
      address: assetFormValue?.currentAddress ?? '',
      roomLocation: assetFormValue?.roomLocation ?? '',
      inspector: this.userStore.userData()?.name?.split(' ')?.[0] ?? '',
      assetName: this.asset().assetName ?? '',
      assetId: this.asset().assetId ?? ''
    };
    this.assetManagerService.setUp(request).subscribe({
      next: () => {
        this.matSnackbar.open(`${this.asset().assetName} ${this.asset().assetId} successfully set up!`);
      },
      error: (err) => {
        this.matSnackbar.open(`${this.asset().assetName} ${this.asset().assetId} failed to be set up due to: ${JSON.stringify(err)}`, '', {
          panelClass: ['!bg-red-300', '!text-red-600']
        });
      }
    });
  }

  private getLocation() {
    this.googleLocationService.getLocationFunction().subscribe({
      next: (res) => {
        const addressWithoutCountry = res.split(', ').slice(0, -1).join(', ');
        this.currentLocation.set(createAjaxState(addressWithoutCountry));
      },
      error: (err) => {
        this.currentLocation.set(createAjaxState(null, false, err));
      }
    });
  }
}
