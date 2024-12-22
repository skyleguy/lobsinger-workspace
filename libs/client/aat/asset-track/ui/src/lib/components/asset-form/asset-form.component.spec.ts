import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { AssetFormComponent } from './asset-form.component';

describe('AssetFormComponent', () => {
  let spectator: Spectator<AssetFormComponent>;
  const createComponent = createComponentFactory({
    component: AssetFormComponent,
    imports: [],
    providers: []
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
