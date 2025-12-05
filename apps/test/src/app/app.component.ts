import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { ThemeService } from '@lob/client-shared-design-system-ui';

import { EmailComponent } from './components/email/email.component';
import { ExportComponent } from './components/export/export.component';
import { FilterComponent } from './components/filter/filter.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  imports: [MenuComponent, FilterComponent, ExportComponent, EmailComponent],
  selector: 'app-root',
  template: `
    <div class="w-dvw h-dvh flex flex-col overflow-hidden">
      <div class="h-fit flex border p-2 gap-2">
        <div class="flex items-center gap-2 whitespace-nowrap">
          <h5>Test App</h5>
          <h6>1.4 Million Results</h6>
          <button (click)="isFilterVisible.set(!isFilterVisible())">Toggle</button>
        </div>
        <div class="grow min-w-0">
          <app-menu [staticItems]="staticItems">
            <app-email />
            @if (isFilterVisible()) {
              <app-filter [cb]="filter" />
            }
            <app-export />
          </app-menu>
        </div>
      </div>
      <div class="grow min-h-0 border"></div>
    </div>
  `,
  styles: ``
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);
  protected readonly isFilterVisible = signal(false);
  protected readonly staticItems: MenuItem[] = [
    {
      label: 'Reset Columns',
      icon: 'fa-solid fa-rotate-left',
      command: () => {
        console.log('Reset Columns action triggered');
      }
    }
  ];

  protected filter = (): void => {
    console.log('i was passed in!');
  };
}
