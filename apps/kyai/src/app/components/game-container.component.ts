import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-game-container',
  standalone: true,
  imports: [],
  templateUrl: 'game-container.component.html'
})
export class GameContainerComponent {
  @HostBinding('class') classes = 'w-full h-full p-3 max-h-full max-w-full flex flex-col';
  @Input()
  responses: string[] = [];
  @Input()
  mysteryCoverPhotoUrl!: string;
}
