import { TitleCasePipe } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [TitleCasePipe],
  selector: 'kyai-layout-ui-top-menu',
  template: `
    <div class="flex justify-between items-center w-full">
      <span>Endless Mysteries</span>
      <span>{{ gameTitle | titlecase }}</span>
      <span></span>
    </div>
  `
})
export class TopMenuComponent {
  @HostBinding('class') classes = 'w-full p-2';
  @Input()
  gameTitle!: string;
}
