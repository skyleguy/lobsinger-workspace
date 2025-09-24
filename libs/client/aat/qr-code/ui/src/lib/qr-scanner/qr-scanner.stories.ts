import { type Meta, type StoryObj } from '@storybook/angular';

import { QrScannerComponent } from './qr-scanner.component';

const meta: Meta<QrScannerComponent> = {
  component: QrScannerComponent,
  title: 'QrScannerComponent'
};
export default meta;

type Story = StoryObj<QrScannerComponent>;

export const Primary: Story = {
  args: {}
};
