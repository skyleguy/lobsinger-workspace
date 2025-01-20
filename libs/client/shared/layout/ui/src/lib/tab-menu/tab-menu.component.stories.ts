import { MatIcon } from '@angular/material/icon';
import { provideRouter } from '@angular/router';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { TabMenuComponent } from './tab-menu.component';

const meta: Meta<TabMenuComponent> = {
  component: TabMenuComponent,
  title: 'TabMenuComponent',
  decorators: [
    applicationConfig({
      providers: [provideRouter([])]
    }),
    moduleMetadata({
      imports: [MatIcon]
    })
  ]
};
export default meta;
type Story = StoryObj<TabMenuComponent>;

export const Primary: Story = {
  args: {
    tabs: [
      {
        icon: 'home',
        label: 'Home',
        link: 'home'
      }
    ]
  }
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tab-menu works!/gi)).toBeTruthy();
  }
};
