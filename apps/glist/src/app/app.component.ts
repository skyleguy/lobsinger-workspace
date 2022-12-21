import { Component, OnInit } from '@angular/core';

import { User } from '@lob/client/shared/auth/data';
import { GoogleAuthProviderService } from '@lob/client/shared/auth/data-access';
import { FirebaseService } from '@lob/client/shared/firebase/data-access';

@Component({
  selector: 'glist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user!: User;

  constructor(
    private firebaseService: FirebaseService,
    private authProvider: GoogleAuthProviderService
  ) {}

  public ngOnInit(): void {
    this.firebaseService.app.subscribe({
      next: (app) => {
        if (app) {
          console.log(app);
        }
      },
    });
    this.authProvider.signIn().subscribe({
      next: (user) => {
        this.user = user;
        console.log(user);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
