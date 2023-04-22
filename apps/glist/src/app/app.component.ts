import { Component } from '@angular/core';

@Component({
  selector: 'glist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    console.log('hello!');
  }
}
