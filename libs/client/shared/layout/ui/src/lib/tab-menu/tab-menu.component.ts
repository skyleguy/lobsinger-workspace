import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { TabMenuItem } from '@lob/client/shared/layout/data';

@Component({
  selector: 'shared-layout-ui-tab-menu',
  imports: [RouterLink, RouterLinkActive],
  styles: `
    .scale-image {
      transform: scale(1.33);
      transform-origin: center;
    }
  `,
  template: `
    <nav class="flex justify-evenly items-center p-3 h-24 border-2 border-t-[#DCDFE1]">
      @for (tab of tabs(); track tab.label) {
        <a class="p-3 relative" [routerLink]="tab.link" routerLinkActive (isActiveChange)="isActiveTabChange($event, tab)" matRipple>
          <div class="flex flex-col items-center justify-center gap-1 text-[#8F959A]" routerLinkActive="!text-[#41454A]">
            <div class="w-16 h-8 flex justify-center items-center rounded-2xl" routerLinkActive="!bg-[#A1C56B] border-[1px] border-black">
              <i class="fa-solid {{ tab.icon }}"></i>
            </div>
            <span>
              {{ tab.label }}
            </span>
          </div>
        </a>
      }
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabMenuComponent {
  tabs = input<TabMenuItem[]>();

  activeTabMenuItem = signal<TabMenuItem | null>(null);

  isActiveTabChange(isActive: boolean, tab: TabMenuItem) {
    if (isActive) {
      this.activeTabMenuItem.set(tab);
    }
  }
}
