import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';

import { Recipe } from '@lob/client/glist/recipes/data';
import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { FirestoreService } from '@lob/client/shared/firebase/data-access';

import * as fromRecipe from './recipe.slice';

@Injectable()
export class RecipeEffects {
  readonly tableName = 'recipe';
  readonly subCollectionName = 'recipes';
  constructor(private actions$: Actions, private userFacadeService: UserFacadeService, private firestoreService: FirestoreService) {}

  getUserRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRecipe.actions.getUserRecipes),
      switchMap(() =>
        this.userFacadeService.user$.pipe(
          switchMap((user) =>
            this.firestoreService.getDocument(this.tableName, [], { collectionGroup: [user.id, this.subCollectionName] }).pipe(
              switchMap((recipes) => of(fromRecipe.actions.getUserRecipesSuccess(recipes as unknown as Recipe[]))),
              catchError((err) => of(fromRecipe.actions.getUserRecipesError(err)))
            )
          )
        )
      )
    )
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRecipe.actions.addRecipe),
      switchMap(({ payload }) =>
        this.userFacadeService.user$.pipe(
          switchMap((user) =>
            this.firestoreService.addDocument(this.tableName, payload, [user.id, this.subCollectionName]).pipe(
              switchMap(() => of(fromRecipe.actions.addRecipeSuccess(payload))),
              catchError((err) => of(fromRecipe.actions.addRecipeError(err)))
            )
          )
        )
      )
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRecipe.actions.deleteRecipe),
      switchMap(({ payload }) =>
        this.userFacadeService.user$.pipe(
          switchMap((user) =>
            this.firestoreService.deleteDocument(this.tableName, payload.id, [user.id, this.subCollectionName]).pipe(
              switchMap(() => of(fromRecipe.actions.deleteRecipeSuccess(payload))),
              catchError((err) => of(fromRecipe.actions.deleteRecipeError(err)))
            )
          )
        )
      )
    )
  );

  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRecipe.actions.updateRecipe),
      switchMap(({ payload }) =>
        this.userFacadeService.user$.pipe(
          switchMap((user) =>
            this.firestoreService.updateDocument(this.tableName, payload, [user.id, this.subCollectionName]).pipe(
              switchMap(() => of(fromRecipe.actions.updateRecipeSuccess(payload))),
              catchError((err) => of(fromRecipe.actions.updateRecipeError(err)))
            )
          )
        )
      )
    )
  );
}
