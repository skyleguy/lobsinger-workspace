import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ClientSharedAuthDataAccessModule } from '@lob/client/shared/auth/data-access';
import { DeviceModule } from '@lob/client/shared/device/data-access';
import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';

import { AppComponent } from './app.component';
import { GlistInitializationService } from './glist-initialization.service';
import { GlistLayoutModule } from './modules/glist-layout/glist-layout.module';

export function initializeAppWithService(glistInitializationService: GlistInitializationService) {
  return () => {
    return glistInitializationService.initializeApp();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DeviceModule.forRoot(),
    GlistLayoutModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      serialize: true
    }),
    ClientSharedAuthDataAccessModule,
    HttpClientModule
  ],
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
        measurementId: 'G-V69BPDWWPB'
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppWithService,
      deps: [GlistInitializationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
