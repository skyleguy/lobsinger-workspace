import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kyai-layout-ui-game-container',
  standalone: true,
  imports: [],
  templateUrl: 'game-container.component.html'
})
export class GameContainerComponent implements OnChanges {
  @HostBinding('class') classes = 'flex flex-col h-full w-full overflow-y-auto gap-3 p-2';

  @Input()
  responses: string[] = [];
  @Input()
  mysteryCoverPhotoUrl!: string;

  @Output()
  textClicked: EventEmitter<string> = new EventEmitter();

  constructor(private hostElement: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['responses']) {
      this.scrollDown();
    }
  }

  private scrollDown(): void {
    if (this.hostElement) {
      setTimeout(() => {
        this.hostElement.nativeElement.scrollTop = this.hostElement.nativeElement.scrollHeight;
      }, 0);
    }
  }
}
