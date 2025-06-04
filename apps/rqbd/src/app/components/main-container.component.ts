import { Component } from '@angular/core';

import { FileGenerationContainerComponent } from './file-generation-container.component';
import { SourceFileContainerComponent } from './source-file-container.component';

@Component({
  selector: 'rqbd-main-container',
  imports: [SourceFileContainerComponent, FileGenerationContainerComponent],
  host: {
    class: 'grow flex gap-3'
  },
  template: `
    <rqbd-source-file-container class="flex-1" />
    <rqbd-file-generation-container class="flex-1" />
  `
})
export class MainContainerComponent {}
