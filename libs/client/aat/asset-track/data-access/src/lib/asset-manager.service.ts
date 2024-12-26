import { inject, Injectable } from '@angular/core';
import { httpsCallable } from 'firebase/functions';
import { first, Subject } from 'rxjs';

import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';

interface CheckoutRequest {
  address: string;
  roomLocation: string;
  inspector: string;
  assetName: string;
  assetId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssetManagerService {
  private readonly firebaseAppStore = inject(FirebaseAppStore);

  public checkOutAsset(req: CheckoutRequest) {
    const obs = new Subject<string>();
    const functions = this.firebaseAppStore.functions();
    if (functions) {
      const currentLocation = httpsCallable<CheckoutRequest, string>(functions, 'checkoutAsset');
      currentLocation(req)
        .then((res) => {
          obs.next(res.data);
        })
        .catch((err) => {
          console.error(`Calling google cloud function for checking out asset failed!`);
          obs.error(err);
        });
    }
    return obs.pipe(first());
  }
}
