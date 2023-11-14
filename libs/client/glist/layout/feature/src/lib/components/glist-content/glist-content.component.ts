import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'glist-layout-feature-content',
  templateUrl: './glist-content.component.html',
  styleUrls: ['./glist-content.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class GlistContentComponent {}
