import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-layout-ui-app-container',
  standalone: true,
  imports: [],
  template: `
    <div class="h-screen w-screen flex flex-col">
      @if (isHeaderAvailable()) {
        <nav id="header" class="shrink flex items-center justify-between">
          <ng-content select="[nav]"></ng-content>
        </nav>
      }
      <div class="grow flex min-h-0">
        @if (isSidebarAvailable()) {
          <div id="sidebar" class="shrink p-3 border-r-2 border-black">
            <ng-content select="[sidebar]"></ng-content>
          </div>
        }
        <div id="main-content" class="grow" [class.overflow-y-auto]="isMainBodyScrollable()">
          <ng-content select="[main-content]"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class AppContainerComponent {
  isSidebarAvailable = input(true);
  isMainBodyScrollable = input(true);
  isHeaderAvailable = input(true);
}
