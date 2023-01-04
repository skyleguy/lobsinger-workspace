import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [IngredientsListComponent],
  exports: [IngredientsListComponent]
})
export class ClientGlistGlistsUiModule {}
