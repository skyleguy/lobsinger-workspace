import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AjaxState } from '@lob/shared/data-management/data';

@Component({
  selector: 'aat-asset-track-ui-asset-form',
  imports: [
    ProgressSpinnerModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    InputTextModule,
    FloatLabelModule,
    FluidModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="relative flex flex-col gap-5">
      @if (isFormLoading()) {
        <div class="absolute inset-0 bg-black/5 z-50 flex justify-center items-center">
          <p-progress-spinner />
        </div>
      }
      <p-fluid class="flex flex-col gap-3">
        <div>
          <p-inputgroup>
            @if (currentLocation()?.loading) {
              <p-inputgroup-addon>
                <i class="fa-solid fa-spin fa-spinner"></i>
              </p-inputgroup-addon>
            }
            <p-floatlabel variant="in">
              <input
                pInputText
                id="address"
                [formControl]="currentAddressControl"
                autocomplete="off"
                (focus)="isAddressInputTouched.emit(true)"
              />
              <label for="address">
                @if (currentLocation()?.loading) {
                  Estimating Address...
                } @else {
                  Asset Address
                }
              </label>
            </p-floatlabel>
          </p-inputgroup>
          @if (currentLocation()?.error) {
            <small class="text-red-500">Error getting address, please enter manually</small>
          } @else if (currentLocation()?.loading || currentLocation()?.data) {
            <small class="whitespace-nowrap">Edit if estimate is not correct.</small>
          }
        </div>
        <p-floatlabel variant="in">
          <p-autocomplete
            inputId="room_location"
            [formControl]="roomLocationControl"
            [suggestions]="filteredRoomOptions"
            [forceSelection]="true"
            [dropdown]="true"
            (completeMethod)="search($event)"
          />
          <label for="room_location">Room Location</label>
        </p-floatlabel>
      </p-fluid>
      <div class="w-full flex justify-center items-center gap-3 pb-3 flex-wrap">
        <button
          pButton
          label="Assign"
          icon="text-xl fa-solid fa-clipboard-list"
          [disabled]="isFormLoading()"
          title="Assign asset to yourself"
          class="flex-auto"
          (click)="assign.emit()"
          type="button"
          [outlined]="true"
          [rounded]="true"
        ></button>
        <button
          pButton
          label="Set Up"
          icon="text-xl fa-solid fa-stopwatch"
          [disabled]="assetForm.invalid || isFormLoading()"
          title="Set up this asset at the address indicated in the form"
          class="flex-auto"
          (click)="setUp.emit(convertFormToPayload())"
          type="button"
          [outlined]="true"
          [rounded]="true"
        ></button>
        <button
          pButton
          label="Pick Up"
          icon="text-xl fa-solid fa-cloud-arrow-up"
          [disabled]="isFormLoading()"
          title="Pick up this asset from client location"
          class="flex-auto"
          (click)="pickUp.emit()"
          type="button"
          [outlined]="true"
          [rounded]="true"
        ></button>
        <button
          pButton
          label="Return"
          icon="text-xl fa-solid fa-home"
          [disabled]="isFormLoading()"
          title="Return this asset to the office"
          class="flex-auto"
          (click)="return.emit()"
          type="button"
          [outlined]="true"
          [rounded]="true"
        ></button>
      </div>
    </form>
  `
})
export class AssetFormComponent {
  private readonly allRoomOptions = ['Basement', 'Dining Room', 'Family Room', 'Living Room', 'Office', 'Bedroom'];

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
  protected roomLocationControl = new FormControl<string>('', {
    validators: [Validators.required]
  });
  protected assetForm = new FormGroup({
    currentAddress: this.currentAddressControl,
    roomLocation: this.roomLocationControl
  });

  protected filteredRoomOptions: string[] = [];

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

  protected search(event: AutoCompleteCompleteEvent) {
    this.filteredRoomOptions = event.query
      ? this.allRoomOptions.filter((option) => {
          return option.toLowerCase().includes(event.query.toLowerCase());
        })
      : [...this.allRoomOptions];
  }
}
