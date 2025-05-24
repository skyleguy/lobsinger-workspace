import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFabButton } from '@angular/material/button';
import { MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { AjaxState } from '@lob/shared/data-management/data';

@Component({
  selector: 'aat-asset-track-ui-asset-form',
  imports: [
    MatFormField,
    MatLabel,
    MatProgressSpinner,
    MatAutocompleteModule,
    MatHint,
    MatInput,
    MatPrefix,
    ReactiveFormsModule,
    MatIcon,
    MatFabButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="relative flex flex-col gap-3">
      @if (isFormLoading()) {
        <div class="absolute inset-0 bg-black/5 z-50 flex justify-center items-center">
          <mat-spinner></mat-spinner>
        </div>
      }
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>
          @if (currentLocation()?.loading) {
            Estimating Address...
          } @else {
            Asset Address
          }
        </mat-label>
        <input
          [formControl]="currentAddressControl"
          matInput
          placeholder="Estimating Address..."
          (focus)="isAddressInputTouched.emit(true)"
        />
        @if (currentLocation()?.loading) {
          <mat-spinner matPrefix class="ml-2 !h-4 !w-4 !max-h-4 !max-w-4"></mat-spinner>
        }
        @if (currentLocation()?.error) {
          <mat-hint class="text-red-500">Error getting address, please enter manually</mat-hint>
        } @else if (currentLocation()?.loading || currentLocation()?.data) {
          <mat-hint>Edit if estimate is not correct</mat-hint>
        }
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>Room Location</mat-label>
        <input type="text" placeholder="Pick one" matInput [matAutocomplete]="auto" [formControl]="roomLocationControl" />
        <mat-autocomplete #auto="matAutocomplete">
          @for (option of roomOptions(); track option) {
            <mat-option [value]="option">{{ option }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>
      <div class="w-full flex justify-center items-center gap-3 pb-3 flex-wrap">
        <button
          mat-fab
          extended
          (click)="assign.emit()"
          class="flex-auto"
          type="button"
          [disabled]="isFormLoading()"
          title="Assign asset to yourself"
        >
          <mat-icon>assignment</mat-icon>
          Assign
        </button>
        <button
          mat-fab
          extended
          (click)="setUp.emit(convertFormToPayload())"
          class="flex-auto"
          type="button"
          [disabled]="assetForm.invalid || isFormLoading()"
          title="Set up this asset at the address indicated in the form"
        >
          <mat-icon>timer</mat-icon>
          Set Up
        </button>
        <button
          mat-fab
          extended
          (click)="pickUp.emit()"
          class="flex-auto"
          type="button"
          [disabled]="isFormLoading()"
          title="Pick up this asset from client location"
        >
          <mat-icon>backup</mat-icon>
          Pick Up
        </button>
        <button
          mat-fab
          extended
          (click)="return.emit()"
          class="flex-auto"
          type="button"
          [disabled]="isFormLoading()"
          title="Return this asset to the office"
        >
          <mat-icon>home</mat-icon>
          Return
        </button>
      </div>
    </form>
  `
})
export class AssetFormComponent {
  protected readonly roomOptions = signal(['Basement', 'Dining Room', 'Family Room', 'Living Room', 'Office', 'Bedroom']);

  isLocationLoading = input(false);
  isFormLoading = input(false);
  currentLocation = input<AjaxState<string | null>>();

  setUp = output<{ currentAddress: string; roomLocation: string }>();
  pickUp = output<void>();
  return = output<void>();
  assign = output<void>();
  isAddressInputTouched = output<boolean>();

  protected currentAddressControl = new FormControl('', {
    validators: [Validators.required]
  });
  protected roomLocationControl = new FormControl('', {
    validators: [Validators.required]
  });
  protected assetForm = new FormGroup({
    currentAddress: this.currentAddressControl,
    roomLocation: this.roomLocationControl
  });

  constructor() {
    effect(() => {
      const address = this.currentLocation();
      if (address?.data) {
        this.currentAddressControl.setValue(address?.data);
      } else if (address?.error) {
        this.currentAddressControl.markAsTouched();
      }
    });
  }

  protected convertFormToPayload(): { currentAddress: string; roomLocation: string } {
    return {
      currentAddress: this.assetForm.value.currentAddress ?? '',
      roomLocation: this.assetForm.value.roomLocation ?? ''
    };
  }

  public resetForm() {
    this.assetForm.patchValue({
      currentAddress: this.currentLocation()?.data ?? '',
      roomLocation: null
    });
  }
}
