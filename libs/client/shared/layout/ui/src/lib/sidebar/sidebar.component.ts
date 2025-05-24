import { Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'shared-layout-ui-sidebar',
  imports: [TieredMenuModule],
  host: {
    class: 'h-full flex flex-col gap-3 items-center'
  },
  template: `
    <ng-content select="[brand]"></ng-content>
    <p-tieredmenu class="grow" styleClass="h-full" [model]="items()" />
  `
})
export class SidebarComponent {
  // active router link styles are being added by styles.scss
  items = input.required<MenuItem[]>();
}
