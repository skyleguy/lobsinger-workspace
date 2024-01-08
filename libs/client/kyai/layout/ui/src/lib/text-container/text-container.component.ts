import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { Suggestion } from '@lob/client/kyai/layout/data';

@Component({
  selector: 'kyai-layout-ui-text-container',
  standalone: true,
  templateUrl: 'text-container.component.html'
})
export class TextContainerComponent {
  @HostBinding('class') classes = 'w-full p-3';
  @Input({
    required: true
  })
  isInitialized!: boolean;
  @Input()
  suggestions?: Suggestion[];

  @Output()
  startMystery: EventEmitter<string> = new EventEmitter();
  @Output()
  submitPrompt: EventEmitter<string> = new EventEmitter();
}
