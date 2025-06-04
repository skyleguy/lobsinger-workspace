import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FileGenerationContainerComponent } from './components/file-generation-container.component';
import { SourceFileContainerComponent } from './components/source-file-container.component';

@Component({
  imports: [RouterModule, SourceFileContainerComponent, FileGenerationContainerComponent],
  selector: 'rqbd-root',
  template: `
    <div class="h-screen w-screen flex flex-col p-3 overflow-hidden">
      <div class="grow flex gap-3">
        <rqbd-source-file-container class="flex-1" />
        <rqbd-file-generation-container class="flex-1" />
      </div>
    </div>
  `
})
export class AppComponent {}
