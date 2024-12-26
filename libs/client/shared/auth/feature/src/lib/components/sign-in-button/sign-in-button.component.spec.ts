import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SignInButtonComponent } from './sign-in-button.component';

describe('SignInButtonComponent', () => {
  let spectator: Spectator<SignInButtonComponent>;
  const createComponent = createComponentFactory(SignInButtonComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
