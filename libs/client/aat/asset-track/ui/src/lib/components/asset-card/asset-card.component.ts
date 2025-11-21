import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { Asset } from '@lob/client/aat/asset-track/data';

@Component({
  selector: 'aat-asset-track-ui-asset-card',
  imports: [CardModule, TitleCasePipe, ButtonModule, RouterLink],
  template: `
    <p-card>
      <div class="flex gap-5 items-center">
        <button
          class="md:hidden"
          aria-label="Back button to return to scanner"
          [routerLink]="backButtonRoute()"
          pButton
          icon="fa-solid fa-arrow-left"
          [rounded]="true"
          size="small"
          data-test="back-button"
        ></button>
        <div class="grow flex justify-between items-center">
          <span class="font-bold">Asset: {{ asset().assetName | titlecase }}</span>
          <p class="text-sm">ID: {{ asset().assetId }}</p>
        </div>
      </div>
    </p-card>
  `
})
export class AssetCardComponent {
  asset = input.required<Asset>();
  backButtonRoute = input.required<string>();
}
