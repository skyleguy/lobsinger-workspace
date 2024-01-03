import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-container',
  standalone: true,
  templateUrl: 'text-container.component.html'
})
export class TextContainerComponent {
  @HostBinding('class') classes = 'w-full p-3';
  @Input({
    required: true
  })
  isInitialized!: boolean;

  @Output()
  startMystery: EventEmitter<string> = new EventEmitter();
  @Output()
  endMystery: EventEmitter<void> = new EventEmitter();
}
