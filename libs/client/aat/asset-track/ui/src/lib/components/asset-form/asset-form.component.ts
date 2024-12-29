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
  standalone: true,
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
    <form class="relative">
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
        <input [formControl]="currentAddressControl" matInput placeholder="Estimating Address..." />
        @if (currentLocation()?.loading) {
          <mat-spinner matPrefix class="ml-2 !h-4 !w-4 !max-h-4 !max-w-4"></mat-spinner>
        }
        <mat-hint>Edit if estimate is not correct</mat-hint>
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
      <div class="w-full flex justify-center items-center gap-3 pb-3">
        <button
          mat-fab
          extended
          (click)="setUp.emit(convertFormToPayload())"
          class="flex-auto"
          type="button"
          [disabled]="assetForm.invalid || isFormLoading()"
        >
          <mat-icon>timer</mat-icon>
          Set Up
        </button>
        <button mat-fab extended (click)="pickUp.emit()" class="flex-auto" type="button" [disabled]="isFormLoading()">
          <mat-icon>backup</mat-icon>
          Pick Up
        </button>
        <button mat-fab extended (click)="return.emit()" class="flex-auto" type="button" [disabled]="isFormLoading()">
          <mat-icon>home</mat-icon>
          Return
        </button>
      </div>
    </form>
  `
})
export class AssetFormComponent {
  protected readonly roomOptions = signal(['Living Room', 'Family Room', 'Dining Room']);

  isLocationLoading = input(false);
  isFormLoading = input(false);
  currentLocation = input<AjaxState<string | null>>();

  setUp = output<{ currentAddress: string; roomLocation: string }>();
  pickUp = output<void>();
  return = output<void>();

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
      const address = this.currentLocation()?.data;
      if (address) {
        this.currentAddressControl.setValue(address);
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
