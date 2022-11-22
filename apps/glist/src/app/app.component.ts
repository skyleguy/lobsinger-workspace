import { Component, OnInit } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';

@Component({
  selector: 'lob-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'glist';
  app!: FirebaseApp;

  public ngOnInit(): void {
    this.initializeApp();
  }

  private initializeApp(): void {
    const firebaseConfig = {
      apiKey: 'AIzaSyADdudZWW-lO8qdTX5-oza_kvcjLGYMteY',
      authDomain: 'glist-aed62.firebaseapp.com',
      projectId: 'glist-aed62',
      storageBucket: 'glist-aed62.appspot.com',
      messagingSenderId: '655452293628',
      appId: '1:655452293628:web:7e64fd6a67257d327e8a79',
      measurementId: 'G-V69BPDWWPB',
    };
    this.app = initializeApp(firebaseConfig);
  }
}
