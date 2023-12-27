import { Router } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { GlistFacadeService } from '@lob/client/glist/glists/data-access';
import { RecipeFacadeService } from '@lob/client/glist/recipes/data-access';
import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { Ingredient } from '@lob/shared/ingredients/data';

import { GlistContainerComponent } from './glist-container.component';

describe('GlistContainerComponent', () => {
  let spectator: Spectator<GlistContainerComponent>;
  const createComponent = createComponentFactory({
    component: GlistContainerComponent,
    mocks: [GlistFacadeService, RecipeFacadeService, Router, UserFacadeService]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  // it('should redirect to dashboard when not signed in', () => {
  //   // Mock isUserSignedInAfterAttempt$ to return false
  //   const userFacadeService = spectator.inject(UserFacadeService);
  //   jest.spyOn(userFacadeService, 'isUserSignedInAfterAttempt$').mockReturnValue(of(false));

  //   // Trigger redirection
  //   spectator.component.doRedirect();

  //   // Assert that router.navigate was called with the correct argument
  //   const router = spectator.inject(Router);
  //   expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  // });

  it('should add new ingredient to glist', () => {
    const ingredient: Ingredient = {
      name: 'test',
      amount: '1'
    };

    // Trigger the method
    spectator.component.addNewIngredientToGlist(ingredient);

    // Assert that the service method was called with the correct argument
    const glistFacadeService = spectator.inject(GlistFacadeService);
    expect(glistFacadeService.addIngredientToGlist).toHaveBeenCalledWith(ingredient);
  });
});
