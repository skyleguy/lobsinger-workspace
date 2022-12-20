import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '@lob/client/shared/firebase/data-access';

@Component({
  selector: 'glist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'glist';

  constructor(private firebaseService: FirebaseService) {}

  public ngOnInit(): void {
    this.firebaseService.app.subscribe({
      next: (app) => {
        if (app) {
          console.log(app);
        }
      },
    });
  }
}
