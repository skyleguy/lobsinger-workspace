import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollVisibilityDirective } from './directives/scroll-visibility/scroll-visibility.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ScrollVisibilityDirective],
  exports: [ScrollVisibilityDirective]
})
export class ClientSharedMobileUtilitiesDataAccessModule {}
