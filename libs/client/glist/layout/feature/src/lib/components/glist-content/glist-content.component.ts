import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'glist-layout-feature-content',
    templateUrl: './glist-content.component.html',
    styleUrls: ['./glist-content.component.scss'],
    imports: [RouterOutlet]
})
export class GlistContentComponent {}
