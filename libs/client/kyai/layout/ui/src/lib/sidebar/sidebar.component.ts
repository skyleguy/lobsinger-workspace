import { Component, HostBinding, Input } from '@angular/core';

import { Character } from '@lob/client/kyai/layout/data';

@Component({
  selector: 'kyai-layout-ui-sidebar',
  standalone: true,
  imports: [],
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent {
  @HostBinding('class') classes = 'w-full h-full p-3';
  @Input()
  characters: Character[] = [];
}
