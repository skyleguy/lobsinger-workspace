import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { TabMenuComponent } from './tab-menu.component';

describe('TabMenuComponent', () => {
  let spectator: Spectator<TabMenuComponent>;
  const createComponent = createComponentFactory(TabMenuComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
