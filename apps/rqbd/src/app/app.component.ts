import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'rqbd-root',
  template: `
    <div class="h-screen w-screen flex flex-col p-3 overflow-hidden">
      <div class="grow flex gap-3">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {}
