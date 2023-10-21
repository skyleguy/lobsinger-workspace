import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipeFilterTrayComponent } from './components/recipe-filter-tray/recipe-filter-tray.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, MatDialogModule, MatInputModule, MatSelectModule],
  declarations: [RecipeCardComponent, RecipeFilterTrayComponent],
  exports: [RecipeCardComponent, RecipeFilterTrayComponent]
})
export class ClientGlistRecipesUiModule {}
