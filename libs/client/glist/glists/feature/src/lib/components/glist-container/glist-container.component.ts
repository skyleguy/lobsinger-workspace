import { Component } from '@angular/core';

import { GlistFacadeService } from '@lob/client/glist/glists/data-access';

@Component({
  selector: 'glist-glist-container',
  templateUrl: './glist-container.component.html',
  styleUrls: ['./glist-container.component.scss']
})
export class GlistContainerComponent {
  constructor(private readonly glistFacadeService: GlistFacadeService) {
    this.glistFacadeService.getUserGlist();
  }
}
