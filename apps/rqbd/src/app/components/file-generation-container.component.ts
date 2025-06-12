import { ChangeDetectionStrategy, Component, effect, inject, signal, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';

import { ContainerComponent } from './container.component';
import { SectionHeaderComponent } from './section-header.component';

import { RepairRequest } from '../models/repair-request.model';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'rqbd-file-generation-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContainerComponent,
    SectionHeaderComponent,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    FluidModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    TextareaModule,
    TooltipModule,
    DividerModule
  ],
  template: `
    <rqbd-container>
      <rqbd-section-header title="Repair Request Document"></rqbd-section-header>
      <div class="min-h-0 grow flex flex-col items-center gap-3">
        <form class="min-h-0 grow w-full flex flex-col gap-5 justify-between">
          <div class="min-h-0 grow flex flex-col gap-3">
            <p-fluid class="shrink flex flex-col gap-3">
              <p-floatlabel variant="on" class="mt-3">
                <input pInputText pSize="small" id="buyerName" autocomplete="off" />
                <label for="buyerName"> Buyer's Full Name </label>
              </p-floatlabel>
              <div class="flex gap-3">
                <p-floatlabel variant="on" class="flex-1">
                  <input pInputText pSize="small" id="propertyAddress" autocomplete="off" />
                  <label for="propertyAddress"> Property Address </label>
                </p-floatlabel>
                <p-floatlabel variant="on" class="flex-1">
                  <input pInputText pSize="small" id="cityStateZip" autocomplete="off" />
                  <label for="cityStateZip"> City, State Zip </label>
                </p-floatlabel>
              </div>
            </p-fluid>
            <div class="min-h-0 grow flex flex-col gap-3 overflow-auto">
              @for (repairRequest of repairRequests(); track $index; let repairRequestIndex = $index) {
                <div class="flex flex-col gap-1">
                  <h4 class="font-bold">Buyer's Request #{{ $index + 1 }}</h4>
                  <textarea
                    pTextarea
                    placeholder="type request here..."
                    [id]="'BuyersRequest' + $index"
                    rows="2"
                    cols="30"
                    style="resize: none"
                    class="h-full w-full"
                  ></textarea>
                  <div class="flex flex-col gap-3">
                    @for (src of repairRequest.images; track src; let imageIndex = $index) {
                      <div class="flex gap-1 items-start">
                        <i
                          class="text-red-600 fa-solid fa-minus-circle cursor-pointer"
                          pTooltip="Remove image"
                          (click)="respondToImageDelete(repairRequest, repairRequestIndex, imageIndex)"
                        ></i>
                        <img class="w-fit " [src]="src" />
                      </div>
                    }
                    <div class="flex gap-1 items-center">
                      <i
                        class="text-green-600 fa-solid fa-plus-circle cursor-pointer"
                        pTooltip="Add image"
                        (click)="selectedRepairRequest.set(selectedRepairRequest() === repairRequest ? null : repairRequest)"
                      ></i>
                      <span class="font-italic" [class.bg-green-600]="selectedRepairRequest() === repairRequest"
                        >Add another selection to Buyer's Request #{{ $index + 1 }}</span
                      >
                    </div>
                  </div>
                </div>
                @if (!$last) {
                  <p-divider class="!m-0 " />
                }
              } @empty {
                <h1 class="mt-6 text-center">Click and drag on the imported pdf to the left to slice out images to add to your request!</h1>
              }
            </div>
          </div>
          <div class="flex justify-end">
            <button
              pButton
              label="Generate PDF"
              icon="text-xl fa-solid fa-file-download"
              title="Generate the PDF using the form values"
              class="flex-auto"
              type="submit"
              [outlined]="true"
              [rounded]="true"
            ></button>
          </div>
        </form>
      </div>
    </rqbd-container>
  `
})
export class FileGenerationContainerComponent {
  protected readonly imageService = inject(ImageService);
  protected repairRequests = signal<RepairRequest[]>([]);
  protected selectedRepairRequest = signal<RepairRequest | null>(null);

  constructor() {
    effect(() => {
      const newImageUrl = this.imageService.imageUrl();
      if (newImageUrl) {
        untracked(() => {
          const selectedRepairRequest = this.selectedRepairRequest();
          if (selectedRepairRequest) {
            selectedRepairRequest.images = [...selectedRepairRequest.images, newImageUrl];
            this.selectedRepairRequest.set(null);
          } else {
            const repairRequests = [...this.repairRequests()];
            repairRequests.push({ images: [newImageUrl], text: '' });
            this.repairRequests.set(repairRequests);
          }
        });
      }
    });
  }

  protected respondToImageDelete(repairRequest: RepairRequest, repairRequestIndex: number, imageIndex: number) {
    repairRequest.images.splice(imageIndex, 1);
    if (repairRequest.images?.length === 0) {
      const repairRequests = [...this.repairRequests()];
      repairRequests.splice(repairRequestIndex, 1);
      this.repairRequests.set(repairRequests);
    }
  }
}
