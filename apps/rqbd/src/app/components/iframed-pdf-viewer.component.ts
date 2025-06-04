import { AfterViewInit, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { format } from 'date-fns';
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
    <ngx-extended-pdf-viewer [src]="generatedFileBlob" [handTool]="false" [textLayer]="false" [theme]="themeService.currentTheme()">
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
      {
        columns: [
          {
            width: 'auto',
            columns: [
              {
                width: 'auto',
                text: [
                  {
                    text: 'RequestBuilder provided by:',
                    bold: true
                  },
                  {
                    text: 'Advantage Inspection Service',
                    italics: true
                  }
                ]
              }
            ]
          },
          {
            width: '*',
            text: "Buyer's Full Name",
            alignment: 'right'
          }
        ]
      },
      {
        text: 'Property Address',
        alignment: 'right'
      },
      {
        text: 'City, State, Zip',
        alignment: 'right'
      },
      {
        text: format(new Date(), 'MM/dd/yyyy'),
        alignment: 'right'
      },
      {
        text: 'Repair Request Attachment',
        color: '#286cb4',
        alignment: 'center',
        fontSize: 20,
        bold: true
      },
      {
        text: 'Buyer requests the following to be evaluated and corrected by qualified professionals:',
        alignment: 'center',
        italics: true
      }
    ];
    const imageSources = this.imageSources();
    if (imageSources) {
      content = content.concat(
        imageSources.map((url, index) => [
          {
            text: `Buyer's Request #${index}:`,
            bold: true
          },
          {
            text: 'Type request here...'
          },
          {
            image: url,
            width: 500
          },
          {
            text: `Add another selection to Buyer's Request #${index}`
          }
        ])
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
