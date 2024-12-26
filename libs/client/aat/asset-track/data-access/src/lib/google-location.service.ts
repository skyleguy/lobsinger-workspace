import { inject, Injectable } from '@angular/core';
import { httpsCallable } from 'firebase/functions';
import { first, Subject } from 'rxjs';

import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';

@Injectable({
  providedIn: 'root'
})
export class GoogleLocationService {
  private readonly firebaseAppStore = inject(FirebaseAppStore);

  getLocationFunction() {
    const obs = new Subject<string>();
    this.getLatitudeAndLongitude((latitude, longitude) => {
      const functions = this.firebaseAppStore.functions();
      if (functions) {
        const currentLocation = httpsCallable<{ latitude: number; longitude: number }, string>(functions, 'getCurrentAddress');
        currentLocation({ latitude, longitude })
          .then((res) => {
            obs.next(res.data);
          })
          .catch((err) => {
            console.error(`Calling google cloud function for currentLocation failed!`);
            obs.error(err);
          });
      }
    });
    return obs.pipe(first());
  }

  private getLatitudeAndLongitude(cb: (latitude: number, longitude: number) => unknown) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        cb(latitude, longitude);
      },
      (geolocationError) => {
        console.error('Error obtaining location', geolocationError);
      },
      { enableHighAccuracy: true }
    );
  }
}
