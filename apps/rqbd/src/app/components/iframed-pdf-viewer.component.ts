import { AfterViewInit, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// eslint-disable-next-line import/no-unresolved
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';

import { PlatformService } from '@lob/client/shared/platform/ui';
import { ThemeService } from '@lob/client/shared/theme/ui';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

@Component({
  selector: 'rqbd-iframed-pdf-viewer',
  imports: [NgxExtendedPdfViewerModule],
  host: {
    class: 'h-full w-full'
  },
  template: ` @if (generatedFileBlob(); as generatedFileBlob) {
    <!-- @for (imageSrc of imageSources(); track imageSrc) {
      <img [src]="imageSrc" />
    } -->
    <ngx-extended-pdf-viewer
      [src]="generatedFileBlob"
      [handTool]="false"
      [showToolbar]="false"
      [textLayer]="false"
      [theme]="themeService.currentTheme()"
    >
    </ngx-extended-pdf-viewer>
  }`
})
export class IframedPdfViewerComponent implements AfterViewInit {
  private readonly platformService = inject(PlatformService);
  protected readonly themeService = inject(ThemeService);

  protected readonly generatedFileBlob = signal<Blob | null>(null);
  protected readonly imageSources = signal<string[]>([]);
  protected readonly docDefinition = linkedSignal<TDocumentDefinitions>(() => {
    let content: Content[] = [
      'First paragraph',
      'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ];
    const imageSources = this.imageSources();
    if (imageSources) {
      content = content.concat(
        imageSources.map((url) => ({
          image: url
        }))
      );
    }
    return {
      content
    };
  });

  constructor() {
    effect(() => {
      this.makePdf(this.docDefinition());
    });
  }

  ngAfterViewInit(): void {
    this.platformService.isBrowser
      ? window.addEventListener('message', (event) => {
          const imageSources = event.data['imageSources'];
          if (imageSources) {
            this.imageSources.set(imageSources);
          }
        })
      : null;
  }

  makePdf(docDefinition: TDocumentDefinitions) {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob(this.generatedFileBlob.set);
  }
}
