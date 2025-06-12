import { Component } from '@angular/core';

@Component({
  selector: 'rqbd-container',
  template: `
    <div
      class="w-full h-full p-3 rounded-lg border-surface-300 dark:border-surface-700 border-2 flex flex-col gap-3 overflow-hidden min-h-0 bg-surface-200 dark:bg-surface-700"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class ContainerComponent {}
