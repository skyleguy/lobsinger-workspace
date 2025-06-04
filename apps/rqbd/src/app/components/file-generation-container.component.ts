import { Component, inject, linkedSignal, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);
import { ThemeService } from '@lob/client/shared/theme/ui';

import { ContainerComponent } from './container.component';
import { SectionHeaderComponent } from './section-header.component';

import { ImageService } from '../services/image.service';

@Component({
  selector: 'rqbd-file-generation-container',
  imports: [ContainerComponent, SectionHeaderComponent, NgxExtendedPdfViewerModule],
  template: `
    <rqbd-container>
      <rqbd-section-header title="Repair Request Document"></rqbd-section-header>
      <div class="grow flex flex-col items-center justify-center gap-3">
        @for (imageSrc of imageSources(); track imageSrc) {
          <img [src]="imageSrc" />
        }
        @if (generatedFileBlob(); as generatedFileBlob) {
          <ngx-extended-pdf-viewer
            class="h-full w-full"
            [src]="generatedFileBlob"
            [handTool]="false"
            [showToolbar]="false"
            [theme]="themeService.currentTheme()"
          ></ngx-extended-pdf-viewer>
        }
      </div>
    </rqbd-container>
  `
})
export class FileGenerationContainerComponent {
  protected readonly imageService = inject(ImageService);
  protected readonly themeService = inject(ThemeService);
  protected readonly generatedFileBlob = signal<Blob | null>(null);

  protected imageSources = linkedSignal<string | null, string[]>({
    source: this.imageService.imageUrl,
    computation: (newImage, previous) => {
      if (newImage) {
        return [...(previous?.value ? previous.value : []), newImage];
      }
      return previous?.value ?? [];
    }
  });

  // constructor() {
  //   this.makePdf();
  // }

  makePdf() {
    const docDefinition = {
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
      ]
    };
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob) => {
      this.generatedFileBlob.set(blob);
    });
  }
}
