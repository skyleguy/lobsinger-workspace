import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { UserAvatarComponent } from './user-avatar.component';

describe('UserAvatarComponent', () => {
  let spectator: Spectator<UserAvatarComponent>;
  const createComponent = createComponentFactory(UserAvatarComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
