import { type Meta, type StoryObj } from '@storybook/angular';
import { expect } from 'storybook/test';

import { TestComponent } from './test-component';

const meta: Meta<TestComponent> = {
  component: TestComponent,
  title: 'TestComponent'
};
export default meta;

type Story = StoryObj<TestComponent>;

export const Primary: Story = {
  args: {
    title: 'Dog'
  }
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText(/TestComponent/gi)).toHaveLength(4);
  }
};
