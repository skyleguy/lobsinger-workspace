import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { OVERFLOW_ITEM_TOKEN, OverflowItem } from '../menu/overflow-item';

@Component({
  selector: 'app-filter',
  imports: [ButtonModule],
  providers: [{ provide: OVERFLOW_ITEM_TOKEN, useExisting: FilterComponent }],
  template: `<button pButton [icon]="icon" severity="secondary" size="small" [label]="label" (click)="cb()"></button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OverflowItem {
  @Input()
  cb: () => void = this.filterClicked;

  label = 'Filter';
  icon = 'fa-solid fa-filter';

  public getDynamicItem(): MenuItem {
    return {
      label: this.label,
      icon: this.icon,
      command: this.cb
    };
  }

  private filterClicked(): void {
    console.log('Filter action triggered');
  }
}
