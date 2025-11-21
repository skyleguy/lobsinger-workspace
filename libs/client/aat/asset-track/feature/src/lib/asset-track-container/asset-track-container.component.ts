import { Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';

import { Asset, isAssetValid } from '@lob/client/aat/asset-track/data';
import { AssetManagerService, GoogleLocationService } from '@lob/client/aat/asset-track/data-access';
import { AssetCardComponent, AssetFormComponent } from '@lob/client/aat/asset-track/ui';
import { UserStore } from '@lob/client/shared/auth/data-access';
import { ToastService } from '@lob/client-shared-messaging-data-access';
import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

@Component({
  selector: 'aat-asset-track-feature-asset-track-container',
  imports: [ButtonModule, RouterLink, AssetFormComponent, AssetCardComponent],
  template: `
    <div class="h-full w-full flex flex-col gap-3" data-test="asset-track-container">
      @if (isValid()) {
        <button
          aria-label="Back button to return to scanner"
          routerLink="/scan"
          class="hidden md:block"
          pButton
          icon="fa-solid fa-arrow-left"
          [rounded]="true"
          size="large"
          data-test="back-button"
        ></button>
        <div class="grow flex flex-col gap-3 md:items-center md:justify-center md:mx-auto">
          <aat-asset-track-ui-asset-card class="w-full" [asset]="asset()" backButtonRoute="/scan"></aat-asset-track-ui-asset-card>
          <aat-asset-track-ui-asset-form
            [currentLocation]="currentLocation()"
            [isFormLoading]="isRequestInProgress()"
            (isAddressInputTouched)="unsubscribeFromLocation()"
            (assign)="assign()"
            (setUp)="setUp($event)"
            (pickUp)="pickUp()"
            (return)="return()"
          ></aat-asset-track-ui-asset-form>
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
  private readonly toastService = inject(ToastService);

  private readonly assetFormComponent = viewChild(AssetFormComponent);
  private readonly paramMap = toSignal(this.activatedRoute.paramMap);

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
  protected isRequestInProgress = signal(false);
  protected locationSub!: Subscription;

  public ngOnInit() {
    this.locationSub = this.getLocation();
  }

  public assign() {
    this.isRequestInProgress.set(true);
    this.assetManagerService
      .assign({
        assetName: this.asset().assetName ?? '',
        assetId: this.asset().assetId ?? '',
        inspector: this.userStore.userData()?.name?.split(' ')?.[0] ?? ''
      })
      .subscribe({
        next: () => {
          this.toastService.toast(
            'success',
            'Assignment Successful',
            `${this.asset().assetName} ${this.asset().assetId} successfully assigned!`
          );
          this.assetFormComponent()?.resetForm();
          this.isRequestInProgress.set(false);
        },
        error: (err) => {
          this.toastService.toast(
            'error',
            'Assignment Failed',
            `${this.asset().assetName} ${this.asset().assetId} failed to be assigned due to: ${JSON.stringify(err)}`
          );
          this.isRequestInProgress.set(false);
        }
      });
  }

  public pickUp() {
    this.isRequestInProgress.set(true);
    this.assetManagerService
      .pickUp({
        assetName: this.asset().assetName ?? '',
        assetId: this.asset().assetId ?? '',
        inspector: this.userStore.userData()?.name?.split(' ')?.[0] ?? ''
      })
      .subscribe({
        next: () => {
          this.toastService.toast(
            'success',
            'Pick Up Successful',
            `${this.asset().assetName} ${this.asset().assetId} successfully picked up!`
          );
          this.assetFormComponent()?.resetForm();
          this.isRequestInProgress.set(false);
        },
        error: (err) => {
          this.toastService.toast(
            'error',
            'Pick Up Failed',
            `${this.asset().assetName} ${this.asset().assetId} failed to be picked up due to: ${JSON.stringify(err)}`
          );
          this.isRequestInProgress.set(false);
        }
      });
  }

  public return() {
    this.isRequestInProgress.set(true);
    this.assetManagerService
      .return({
        assetName: this.asset().assetName ?? '',
        assetId: this.asset().assetId ?? '',
        inspector: this.userStore.userData()?.name?.split(' ')?.[0] ?? ''
      })
      .subscribe({
        next: () => {
          this.toastService.toast(
            'success',
            'Return Home Successful',
            `${this.asset().assetName} ${this.asset().assetId} successfully returned home!`
          );
          this.assetFormComponent()?.resetForm();
          this.isRequestInProgress.set(false);
        },
        error: (err) => {
          this.toastService.toast(
            'error',
            'Return Home Failed',
            `${this.asset().assetName} ${this.asset().assetId} failed to be returned home due to: ${JSON.stringify(err)}`
          );
          this.isRequestInProgress.set(false);
        }
      });
  }

  public setUp(formValues: { currentAddress: string; roomLocation: string }) {
    this.isRequestInProgress.set(true);
    const request = {
      address: formValues?.currentAddress,
      roomLocation: formValues?.roomLocation,
      inspector: this.userStore.userData()?.name?.split(' ')?.[0] ?? '',
      assetName: this.asset().assetName ?? '',
      assetId: this.asset().assetId ?? ''
    };
    this.assetManagerService.setUp(request).subscribe({
      next: () => {
        this.toastService.toast('success', 'Set Up Successful', `${this.asset().assetName} ${this.asset().assetId} successfully set up!`);
        this.assetFormComponent()?.resetForm();
        this.isRequestInProgress.set(false);
      },
      error: (err) => {
        this.toastService.toast(
          'error',
          'Set Up Failure',
          `${this.asset().assetName} ${this.asset().assetId} failed to be set up due to: ${JSON.stringify(err)}`
        );
        this.isRequestInProgress.set(false);
      }
    });
  }

  protected unsubscribeFromLocation() {
    this.locationSub.unsubscribe();
    this.currentLocation.set(createAjaxState(null, false));
  }

  private getLocation() {
    return this.googleLocationService.getLocationFunction().subscribe({
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
