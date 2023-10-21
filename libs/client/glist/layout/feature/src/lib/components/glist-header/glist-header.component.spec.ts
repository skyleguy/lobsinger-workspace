import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { GlistHeaderComponent } from './glist-header.component';

describe('GlistHeaderComponent', () => {
  let spectator: Spectator<GlistHeaderComponent>;
  const createComponent = createComponentFactory({
    component: GlistHeaderComponent
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
