import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { OVERFLOW_ITEM_TOKEN, OverflowItem } from '../menu/overflow-item';

@Component({
  selector: 'app-export',
  imports: [ButtonModule],
  providers: [{ provide: OVERFLOW_ITEM_TOKEN, useExisting: ExportComponent }],
  template: `<button pButton [icon]="icon" severity="secondary" size="small" [label]="label"></button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportComponent implements OverflowItem {
  label = 'Export';
  icon = 'fa-solid fa-download';

  public getDynamicItem(): MenuItem {
    return {
      label: this.label,
      icon: this.icon,
      command: () => {
        console.log('Email action triggered');
      }
    };
  }
}
