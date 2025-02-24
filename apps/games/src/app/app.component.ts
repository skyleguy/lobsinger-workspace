import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterModule],
  selector: 'games-root',
  template: `
    <div class="h-screen w-screen min-w-0 min-h-0 overflow-hidden">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
