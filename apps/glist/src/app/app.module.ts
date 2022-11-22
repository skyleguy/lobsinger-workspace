import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: FirebaseOptionsToken,
      useValue: {
        apiKey: 'AIzaSyADdudZWW-lO8qdTX5-oza_kvcjLGYMteY',
        authDomain: 'glist-aed62.firebaseapp.com',
        projectId: 'glist-aed62',
        storageBucket: 'glist-aed62.appspot.com',
        messagingSenderId: '655452293628',
        appId: '1:655452293628:web:7e64fd6a67257d327e8a79',
        measurementId: 'G-V69BPDWWPB',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
