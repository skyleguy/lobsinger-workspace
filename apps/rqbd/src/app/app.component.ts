import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppContainerComponent } from '@lob/client/shared/layout/ui';
import { ThemeTogglerComponent } from '@lob/client/shared/theme/ui';

import { FileGenerationContainerComponent } from './components/file-generation-container.component';
import { SourceFileContainerComponent } from './components/source-file-container.component';

@Component({
  imports: [RouterModule, AppContainerComponent, ThemeTogglerComponent, SourceFileContainerComponent, FileGenerationContainerComponent],
  selector: 'rqbd-root',
  template: `
    <shared-layout-ui-app-container [isSidebarAvailable]="false" [isMainBodyScrollable]="false">
      <ng-container nav>
        <h1 nav>RequestBuilder</h1>
        <div class="flex items-center gap-3">
          <img width="120" id="advantageLogo" src="https://i.imgur.com/bwv4eWc.png" />
          <shared-theme-ui-theme-toggler></shared-theme-ui-theme-toggler>
        </div>
      </ng-container>
      <ng-container main-content>
        <div class="w-full h-full flex gap-3">
          <rqbd-source-file-container class="flex-1" />
          <rqbd-file-generation-container class="flex-1" />
        </div>
      </ng-container>
    </shared-layout-ui-app-container>
  `
})
export class AppComponent {}
