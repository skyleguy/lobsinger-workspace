import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

import { Asset } from '@lob/client/aat/asset-track/data';

@Component({
  selector: 'aat-asset-track-ui-asset-card',
  imports: [CardModule, TitleCasePipe],
  template: `
    <p-card header="Asset: {{ asset().assetName | titlecase }}">
      <p>ID: {{ asset().assetId }}</p>
    </p-card>
  `
})
export class AssetCardComponent {
  asset = input.required<Asset>();
}
