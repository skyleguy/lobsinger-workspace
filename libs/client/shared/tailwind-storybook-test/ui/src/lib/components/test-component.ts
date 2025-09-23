import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'shared-tailwind-storybook-test-ui-test-component',
  imports: [ButtonModule],
  template: `
    <div class="w-full h-full flex gap-3">
      <div class="border border-black p-3">
        {{ title() }}
      </div>
      <div class="border border-black p-3">
        {{ title() }}
      </div>
      <div class="border border-black p-3">
        {{ title() }}
      </div>
      <div class="border border-black p-3">
        {{ title() }}
      </div>
      <p-button label="Click"></p-button>
      <i class="fa fa-trash"></i>
    </div>
  `
})
export class TestComponent {
  title = input('TestComponent');
}
