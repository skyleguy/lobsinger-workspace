import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [TitleCasePipe],
  selector: 'app-top-menu',
  template: `
    <div class="flex align-center items-center">
      {{ gameTitle | titlecase }}
    </div>
  `
})
export class TopMenuComponent {
  @Input()
  gameTitle!: string;
}
