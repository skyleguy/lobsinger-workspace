import { Component, input } from '@angular/core';

@Component({
  selector: 'rqbd-section-header',
  imports: [],
  template: ` <h1 class="font-bold">{{ title() }}</h1> `,
  host: {
    class: '!m-auto'
  }
})
export class SectionHeaderComponent {
  title = input.required<string>();
}
