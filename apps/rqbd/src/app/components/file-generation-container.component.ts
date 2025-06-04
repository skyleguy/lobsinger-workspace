import { Component, effect, ElementRef, inject, linkedSignal, viewChild } from '@angular/core';

import { ContainerComponent } from './container.component';
import { SectionHeaderComponent } from './section-header.component';

import { ImageService } from '../services/image.service';

@Component({
  selector: 'rqbd-file-generation-container',
  imports: [ContainerComponent, SectionHeaderComponent],
  template: `
    <rqbd-container>
      <rqbd-section-header title="Repair Request Document"></rqbd-section-header>
      <div class="grow flex flex-col items-center justify-center gap-3">
        <iframe #generatedPdf class="w-full h-full" id="generated" src="/iframe/test"></iframe>
      </div>
    </rqbd-container>
  `
})
export class FileGenerationContainerComponent {
  protected readonly imageService = inject(ImageService);
  private readonly generatedPdfIframe = viewChild<ElementRef<HTMLIFrameElement>>('generatedPdf');

  protected imageSources = linkedSignal<string | null, string[]>({
    source: this.imageService.imageUrl,
    computation: (newImage, previous) => {
      if (newImage) {
        return [...(previous?.value ? previous.value : []), newImage];
      }
      return previous?.value ?? [];
    }
  });

  constructor() {
    effect(() => {
      const imageSources = this.imageSources();
      const iframe = this.generatedPdfIframe();
      if (imageSources?.length && iframe) {
        iframe.nativeElement.contentWindow?.postMessage({
          imageSources
        });
      }
    });
  }
}
