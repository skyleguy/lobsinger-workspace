import { Route } from '@angular/router';

import { AssetTrackContainerComponent } from '@lob/client/aat/asset-track/feature';
import { QrCodeContainerComponent } from '@lob/client/aat/qr-code/feature';

import { assetRouteFragments } from './routes.const';

export const appRoutes: Route[] = [
  {
    path: assetRouteFragments,
    component: AssetTrackContainerComponent
  },
  {
    path: 'scan',
    component: QrCodeContainerComponent
  },
  {
    path: '**',
    redirectTo: 'scan'
  }
];
