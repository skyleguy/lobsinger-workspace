import { Component, inject, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { ThemeService } from '../services';

@Component({
  selector: 'shared-theme-ui-theme-toggler',
  imports: [ToggleButtonModule, FormsModule],
  template: `
    <p-togglebutton [(ngModel)]="isChecked" onLabel="" offLabel="" ariaLabel="mode selector" (onChange)="applyTheme($event.checked)">
      <ng-template #content let-checked>
        @if (checked === true || checked === false) {
          <i class="fa-solid {{ checked ? 'fa-sun' : 'fa-moon' }}"></i>
        }
      </ng-template>
    </p-togglebutton>
  `
})
export class ThemeTogglerComponent {
  private readonly themeService = inject(ThemeService);
  protected isChecked = linkedSignal(() => {
    const theme = this.themeService.currentTheme();
    return theme === 'light' ? true : false;
  });

  protected applyTheme(checked: boolean | undefined) {
    if (checked !== undefined) {
      this.themeService.currentTheme.set(checked ? 'light' : 'dark');
    }
  }
}
