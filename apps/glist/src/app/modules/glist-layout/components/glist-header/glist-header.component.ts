import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'glist-header',
  templateUrl: './glist-header.component.html',
  styleUrls: ['./glist-header.component.scss'],
})
export class GlistHeaderComponent {
  @Output()
  menuClicked: EventEmitter<void> = new EventEmitter();

  searchText = '';
}
