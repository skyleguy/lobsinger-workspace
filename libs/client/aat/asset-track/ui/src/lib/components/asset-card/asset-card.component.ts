import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

import { Asset } from '@lob/client/aat/asset-track/data';

@Component({
  selector: 'aat-asset-track-ui-asset-card',
  standalone: true,
  imports: [MatCard, MatCardContent, TitleCasePipe],
  template: `
    <mat-card appearance="outlined" class="w-full">
      <mat-card-content>
        <div class="flex flex-col">
          <span class="font-medium">Asset: {{ asset().assetName | titlecase }}</span>
          <span>ID: {{ asset().assetId }}</span>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class AssetCardComponent {
  asset = input.required<Asset>();
}
