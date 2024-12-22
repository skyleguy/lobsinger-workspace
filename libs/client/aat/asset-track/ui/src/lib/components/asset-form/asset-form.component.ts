import { ChangeDetectionStrategy, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatHint, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'aat-asset-track-ui-asset-form',
  standalone: true,
  imports: [MatFormField, MatLabel, MatProgressSpinner, MatAutocompleteModule, MatHint, MatInput, MatPrefix],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form>
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Asset Address</mat-label>
        <input #addressInput matInput placeholder="Estimating Address..." />
        @if (isLocationLoading()) {
          <mat-spinner matPrefix class="ml-2 !h-4 !w-4 !max-h-4 !max-w-4"></mat-spinner>
        }
        <mat-hint>Edit if estimate is not correct</mat-hint>
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>Number</mat-label>
        <input type="text" placeholder="Pick one" aria-label="Number" matInput [matAutocomplete]="auto" />
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
  private readonly addressInput = viewChild<ElementRef>('addressInput');

  protected readonly roomOptions = signal(['Living Room', 'Family Room', 'Dining Room']);

  isLocationLoading = input(false);
  currentLocation = input<string>();
}
