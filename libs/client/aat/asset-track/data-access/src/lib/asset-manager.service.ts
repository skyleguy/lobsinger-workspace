import { inject, Injectable } from '@angular/core';
import { httpsCallable } from 'firebase/functions';
import { first, Subject } from 'rxjs';

import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';

interface SetupRequest {
  address: string;
  roomLocation: string;
  inspector: string;
  assetName: string;
  assetId: string;
}

interface PickupRequest {
  assetName: string;
  assetId: string;
  inspector: string;
}

interface ReturnRequest {
  assetName: string;
  assetId: string;
  inspector: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssetManagerService {
  private readonly firebaseAppStore = inject(FirebaseAppStore);

  public setUp(setupRequest: SetupRequest) {
    const obs = new Subject<string>();
    const functions = this.firebaseAppStore.functions();
    if (functions) {
      const currentLocation = httpsCallable<SetupRequest, string>(functions, 'setUpAsset');
      currentLocation(setupRequest)
        .then((res) => {
          obs.next(res.data);
        })
        .catch((err) => {
          console.error(`Calling google cloud function for setting up asset failed!`);
          obs.error(err);
        });
    }
    return obs.pipe(first());
  }

  public pickUp(pickupRequest: PickupRequest) {
    const obs = new Subject<string>();
    const functions = this.firebaseAppStore.functions();
    if (functions) {
      const currentLocation = httpsCallable<PickupRequest, string>(functions, 'pickUpAsset');
      currentLocation(pickupRequest)
        .then((res) => {
          obs.next(res.data);
        })
        .catch((err) => {
          console.error(`Calling google cloud function for picking up asset failed!`);
          obs.error(err);
        });
    }
    return obs.pipe(first());
  }

  public return(returnRequest: ReturnRequest) {
    const obs = new Subject<string>();
    const functions = this.firebaseAppStore.functions();
    if (functions) {
      const currentLocation = httpsCallable<ReturnRequest, string>(functions, 'returnAsset');
      currentLocation(returnRequest)
        .then((res) => {
          obs.next(res.data);
        })
        .catch((err) => {
          console.error(`Calling google cloud function for returning asset failed!`);
          obs.error(err);
        });
    }
    return obs.pipe(first());
  }
}