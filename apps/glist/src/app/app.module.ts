import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ClientSharedAuthDataAccessModule } from '@lob/client/shared/auth/data-access';
import { DeviceModule } from '@lob/client/shared/device/data-access';
import { ClientSharedFirebaseDataAccessModule } from '@lob/client/shared/firebase/data-access';
import { ClientSharedMobileUtilitiesDataAccessModule } from '@lob/client/shared/mobile/utilities/data-access';

import { AppComponent } from './app.component';
import { GlistLayoutModule } from './modules/glist-layout/glist-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    DeviceModule.forRoot(),
    GlistLayoutModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      serialize: true
    }),
    ClientSharedFirebaseDataAccessModule.forRoot({
      firebaseOptions: {
        apiKey: 'AIzaSyADdudZWW-lO8qdTX5-oza_kvcjLGYMteY',
        authDomain: 'glist-aed62.firebaseapp.com',
        projectId: 'glist-aed62',
        storageBucket: 'glist-aed62.appspot.com',
        messagingSenderId: '655452293628',
        appId: '1:655452293628:web:7e64fd6a67257d327e8a79',
        measurementId: 'G-V69BPDWWPB'
      }
    }),
    ClientSharedMobileUtilitiesDataAccessModule,
    ClientSharedAuthDataAccessModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
