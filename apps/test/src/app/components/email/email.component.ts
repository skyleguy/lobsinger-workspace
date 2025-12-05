import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { OVERFLOW_ITEM_TOKEN, OverflowItem } from '../menu/overflow-item';

@Component({
  selector: 'app-email',
  imports: [ButtonModule],
  providers: [{ provide: OVERFLOW_ITEM_TOKEN, useExisting: EmailComponent }],
  template: `<button pButton [icon]="icon" severity="secondary" size="small" [label]="label"></button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailComponent implements OverflowItem {
  label = 'Email';
  icon = 'fa-solid fa-envelope';
}
