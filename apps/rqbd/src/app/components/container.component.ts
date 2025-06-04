import { Component } from '@angular/core';

@Component({
  selector: 'rqbd-container',
  template: `
    <div class="w-full h-full p-3 border-surface-800 border-2 flex flex-col gap-3">
      <ng-content></ng-content>
    </div>
  `
})
export class ContainerComponent {}
