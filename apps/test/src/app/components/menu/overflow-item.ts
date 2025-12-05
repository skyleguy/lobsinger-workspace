import { InjectionToken } from '@angular/core';
import { MenuItem } from 'primeng/api';

export interface OverflowItem {
  label: string;
  icon: string;
  cb?: () => void;
  getDynamicItem?: () => MenuItem;
}

export const OVERFLOW_ITEM_TOKEN = new InjectionToken<OverflowItem>('OverflowItemToken');
