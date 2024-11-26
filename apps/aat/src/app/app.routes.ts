import { Route } from '@angular/router';

import { AssetTrackContainerComponent } from '@lob/client/aat/asset-track/feature';
import { QrCodeContainerComponent } from '@lob/client/aat/qr-code/feature';

export const appRoutes: Route[] = [
  {
    path: ':assetName/:assetId',
    component: AssetTrackContainerComponent
  },
  {
    path: 'scan',
    component: QrCodeContainerComponent
  }
];
