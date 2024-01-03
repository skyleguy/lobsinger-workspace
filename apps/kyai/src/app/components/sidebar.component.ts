import { Component, HostBinding, Input } from '@angular/core';

import { Character, Location } from '../models/mystery.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent {
  @HostBinding('class') classes = 'w-full h-full p-3';
  @Input()
  characters: Character[] = [];
  @Input()
  locations: Location[] = [];
}
