import { Component, computed, inject, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule, PageRenderedEvent } from 'ngx-extended-pdf-viewer';
import { ButtonModule } from 'primeng/button';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';

import { ThemeService } from '@lob/client/shared/theme/ui';

import { ContainerComponent } from './container.component';
import { SectionHeaderComponent } from './section-header.component';

import { ImageService } from '../services/image.service';

@Component({
  selector: 'rqbd-source-file-container',
  imports: [ContainerComponent, SectionHeaderComponent, NgxExtendedPdfViewerModule, FileUploadModule, ButtonModule, TooltipModule],
  styleUrl: './no-content-upload.css',
  template: `
    <rqbd-container>
      <rqbd-section-header title="Inspection Report"></rqbd-section-header>
      <div class="grow flex flex-col gap-3 justify-center">
        @if (selectedFile()) {
          <p-fileupload
            mode="advanced"
            class="w-full"
            styleClass="no-content-upload"
            accept="application/pdf"
            (onSelect)="onSelect($event)"
            [auto]="true"
          >
            <ng-template #header let-chooseCallback="chooseCallback">
              <div class="flex flex-wrap justify-between items-center gap-3">
                <p-button
                  size="small"
                  (onClick)="chooseCallback()"
                  icon="fa-solid fa-file-circle-plus"
                  [rounded]="true"
                  [outlined]="true"
                  pTooltip="Select Different Report"
                />
                <h6>{{ selectedFileName() }}</h6>
              </div>
            </ng-template>
            <ng-template #content> </ng-template>
            <ng-template #file></ng-template>
            <ng-template #empty> </ng-template>
          </p-fileupload>
          @if (selectedFileBlob(); as selectedFileBlob) {
            <ngx-extended-pdf-viewer
              class="h-full w-full"
              [src]="selectedFileBlob"
              [handTool]="false"
              [showToolbar]="false"
              [textLayer]="false"
              [theme]="themeService.currentTheme()"
              zoom="page-fit"
              (pageRendered)="onPageRendered($event)"
            ></ngx-extended-pdf-viewer>
          }
        } @else {
          <div class="justify-center items-center flex flex-col gap-12">
            <div class="flex flex-col gap-3 text-center text-3xl">
              <p>Please upload your inspection report to get started.</p>
              <p>
                New to request builder?
                <a class="text-primary-500" href="https://www.youtube.com/watch?v=oogOfxcxkKE" target="_blank">Click here</a> to watch a
                short tutorial video.
              </p>
            </div>
            <p-fileupload chooseIcon="fa-solid fa-file-upload" accept="application/pdf" [fileLimit]="1" (onSelect)="onSelect($event)">
              <ng-template #header>
                <div class="w-full flex items-center justify-center">
                  <p-fileupload
                    mode="basic"
                    chooseIcon="fa-solid fa-file-upload"
                    accept="application/pdf"
                    (onSelect)="onSelect($event)"
                    [auto]="true"
                    chooseLabel="Select Inspection Report"
                  />
                </div>
              </ng-template>
              <ng-template #file> </ng-template>
              <ng-template #content> </ng-template>
              <ng-template #empty>
                <div class="flex items-center justify-center flex-col">
                  <i class="fa-solid fa-file-upload !border-2 text-primary !rounded-full !px-8 !py-6 !text-4xl"></i>
                  <p class="mt-6 mb-0">Drag and drop files to here to upload</p>
                </div>
              </ng-template>
            </p-fileupload>
          </div>
        }
      </div>
    </rqbd-container>
  `
})
export class SourceFileContainerComponent {
  private readonly imageService = inject(ImageService);
  protected readonly themeService = inject(ThemeService);

  protected readonly selectedFile = signal<File | null>(null);
  protected readonly selectedFileName = computed(() => this.selectedFile()?.name);
  protected readonly selectedFileBlob = computed(() => {
    const file = this.selectedFile();
    if (file) {
      const blob = new Blob([file], { type: 'application/pdf' });
      return blob;
    }
    return null;
  });

  onSelect(event: FileSelectEvent) {
    const file = event?.files?.[0];
    if (file) {
      this.selectedFile.set(file);
    }
  }

  onPageRendered(event: PageRenderedEvent) {
    const pageNumber = event.pageNumber;
    if (event.pageNumber) {
      if (!pageNumber) return;
      const pageDiv = document.querySelectorAll(`[data-page-number="${pageNumber}"]`)[1] as HTMLElement | null;
      if (!pageDiv) return;
      const canvas = pageDiv.querySelector('.canvasWrapper > canvas') as HTMLCanvasElement | null;
      if (!canvas) return;
      this.setupEventsForCanvas(canvas, pageDiv);
    }
  }

  private setupEventsForCanvas(canvas: HTMLCanvasElement, target: HTMLElement) {
    let startY = 0;
    let width = 0;
    let height = 0;
    let isDragging = false;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const originalCanvasImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      target.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = this.calculateYCoordinateAfterDisplayScale(canvas, e.clientY);
      });

      target.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        ctx.putImageData(originalCanvasImage, 0, 0);
        width = canvas.width;
        const currentY = this.calculateYCoordinateAfterDisplayScale(canvas, e.clientY);
        height = currentY - startY;
        ctx.fillRect(0, startY, width, height);
      });

      target.addEventListener('mouseup', () => {
        isDragging = false;
        if (height !== 0) {
          ctx.putImageData(originalCanvasImage, 0, 0);
          const imageData = ctx.getImageData(0, startY, width, height);
          if (imageData) {
            this.imageService.imageUrl.set(this.imageDataToDataUrl(imageData, width, height));
          }
        }
        startY = 0;
        width = 0;
        height = 0;
      });
    }
  }

  private calculateYCoordinateAfterDisplayScale(canvas: HTMLCanvasElement, clientY: number) {
    const rect = canvas.getBoundingClientRect();
    return (clientY - rect.top) * this.getCanvasScale(canvas);
  }

  private getCanvasScale(canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    return canvas.height / rect.height;
  }

  private imageDataToDataUrl(imageData: ImageData, width: number, height: number): string {
    const scale = 1 / (window.devicePixelRatio || 1);
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = width * scale;
    outputCanvas.height = height * scale;

    const outputCtx = outputCanvas.getContext('2d');
    if (outputCtx) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx?.putImageData(imageData, 0, 0);

      outputCtx.drawImage(tempCanvas, 0, 0, outputCanvas.width, outputCanvas.height);

      return outputCanvas.toDataURL();
    }
    return '';
  }
}
