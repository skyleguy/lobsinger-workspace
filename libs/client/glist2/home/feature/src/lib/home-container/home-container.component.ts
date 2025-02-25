import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'client-glist2-feature-home-container',
  imports: [CommonModule],
  template: `<p>home container works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContainerComponent {}
