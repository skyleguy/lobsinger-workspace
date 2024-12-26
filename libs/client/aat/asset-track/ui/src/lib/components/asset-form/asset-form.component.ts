import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { AjaxState } from '@lob/shared/data-management/data';

@Component({
  selector: 'aat-asset-track-ui-asset-form',
  standalone: true,
  imports: [MatFormField, MatLabel, MatProgressSpinner, MatAutocompleteModule, MatHint, MatInput, MatPrefix, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form>
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
    </form>
  `
})
export class AssetFormComponent {
  protected readonly roomOptions = signal(['Living Room', 'Family Room', 'Dining Room']);

  isLocationLoading = input(false);
  currentLocation = input<AjaxState<string | null>>();

  protected currentAddressControl = new FormControl('');
  protected roomLocationControl = new FormControl('');
  public assetForm = new FormGroup({
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
}
