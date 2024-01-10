import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';

import { Suggestion } from '@lob/client/kyai/layout/data';

@Component({
  selector: 'kyai-layout-ui-text-container',
  standalone: true,
  templateUrl: 'text-container.component.html'
})
export class TextContainerComponent {
  @HostBinding('class') classes = 'w-full h-full p-3';
  @ViewChild('chatMessage')
  chatMessage!: ElementRef;
  @ViewChild('mysteryPrompt')
  mysteryPrompt!: ElementRef;

  @Input({
    required: true
  })
  isInitialized!: boolean;
  @Input()
  suggestions?: Suggestion[];

  @Output()
  startMystery: EventEmitter<string> = new EventEmitter();
  @Output()
  addToChat: EventEmitter<string> = new EventEmitter();

  addToChatPrompt(prompt: string) {
    this.addToChat.emit(prompt);
    this.resetInput(this.chatMessage);
  }

  startMysteryPrompt(prompt: string) {
    this.startMystery.emit(prompt);
    this.resetInput(this.mysteryPrompt);
  }

  private resetInput(el: ElementRef) {
    const input = el.nativeElement as HTMLInputElement;
    input.value = '';
  }
}
