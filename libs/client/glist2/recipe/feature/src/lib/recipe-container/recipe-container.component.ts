import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'client-glist2-feature-recipe-container',
  imports: [CommonModule],
  template: `<p>recipe container works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeContainerComponent {}
