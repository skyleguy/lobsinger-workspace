import { provideRouter } from '@angular/router';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';

import { AssetCardComponent } from './asset-card.component';

const meta: Meta<AssetCardComponent> = {
  component: AssetCardComponent,
  title: 'AssetCardComponent',
  decorators: [
    applicationConfig({
      providers: [provideRouter([])]
    })
  ]
};
export default meta;

type Story = StoryObj<AssetCardComponent>;

export const Primary: Story = {
  args: {
    asset: {
      assetId: '12345',
      assetName: 'Radon'
    },
    backButtonRoute: '/scan'
  }
};
