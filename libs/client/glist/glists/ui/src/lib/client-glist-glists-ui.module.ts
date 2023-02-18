import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';

@NgModule({
  imports: [CommonModule, MatCheckboxModule, MatDividerModule, MatIconModule, DragDropModule],
  declarations: [IngredientsListComponent],
  exports: [IngredientsListComponent]
})
export class ClientGlistGlistsUiModule {}
