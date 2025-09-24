import type { Meta, StoryObj } from '@storybook/angular';

import { AssetFormComponent } from './asset-form.component';

const meta: Meta<AssetFormComponent> = {
  component: AssetFormComponent,
  title: 'AssetFormComponent'
};
export default meta;

type Story = StoryObj<AssetFormComponent>;

export const Primary: Story = {
  args: {}
};
