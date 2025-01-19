import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { TabsComponent } from './tab-menu.component';

describe('TabsComponent', () => {
  let spectator: Spectator<TabsComponent>;
  const createComponent = createComponentFactory(TabsComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
