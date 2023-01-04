import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmActionComponent } from './components/confirm-action/confirm-action.component';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [ConfirmActionComponent],
  exports: [ConfirmActionComponent]
})
export class ClientSharedUserActionsUiModule {}
