import { Injectable } from '@angular/core';
import { deepCopy } from '@firebase/util';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { Glist } from '@lob/client/glist/glists/data';
import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { FirestoreService } from '@lob/client/shared/firebase/data-access';

import * as fromGlist from './glist.slice';

@Injectable()
export class GlistEffects {
  readonly tableName = 'glist';
  readonly subCollectionName = 'glists';
  constructor(
    private actions$: Actions,
    private userFacadeService: UserFacadeService,
    private firestoreService: FirestoreService,
    private store: Store<Record<string, fromGlist.GlistState>>
  ) {}

  getUserRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGlist.actions.getUserGlist),
      switchMap(() =>
        this.userFacadeService.user$.pipe(
          switchMap((user) =>
            this.firestoreService.getDocument(this.tableName, [], { collectionGroup: [user.id, this.subCollectionName] }).pipe(
              switchMap((glist) => {
                let currGlist: Glist = glist?.[0] as unknown as Glist;
                if (!currGlist) {
                  currGlist = {
                    recipes: [],
                    ingredients: [],
                    id: user.id
                  };
                  return this.firestoreService.addDocument(this.tableName, currGlist, [user.id, this.subCollectionName]).pipe(
                    switchMap(() => {
                      return of(fromGlist.actions.getUserGlistSuccess(currGlist));
                    }),
                    catchError((err) => of(fromGlist.actions.getUserGlistError(err)))
                  );
                }
                return of(fromGlist.actions.getUserGlistSuccess(currGlist));
              }),
              catchError((err) => of(fromGlist.actions.getUserGlistError(err)))
            )
          )
        )
      )
    )
  );

  addRecipeToGlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGlist.actions.addRecipeToGlist),
      map(({ payload }) => payload),
      withLatestFrom(this.store, (payload, state) => {
        return { state: state[fromGlist.glistSliceName], payload };
      }),
      switchMap(({ state, payload }) => {
        return this.userFacadeService.user$.pipe(
          switchMap((user) => {
            const newGlist: Glist = { ...state.glist, recipes: [...state.glist.recipes, payload] };
            return this.firestoreService.updateDocument(this.tableName, newGlist, [user.id, this.subCollectionName]).pipe(
              switchMap(() => of(fromGlist.actions.addRecipeToGlistSuccess(payload))),
              catchError((err) => of(fromGlist.actions.addRecipeToGlistError(err)))
            );
          })
        );
      })
    )
  );

  deleteRecipeFromGlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGlist.actions.deleteRecipeFromGlist),
      map(({ payload }) => payload),
      withLatestFrom(this.store, (payload, state) => {
        return { state: state[fromGlist.glistSliceName], payload };
      }),
      switchMap(({ state, payload }) => {
        return this.userFacadeService.user$.pipe(
          switchMap((user) => {
            const newGlist: Glist = { ...state.glist };
            newGlist.recipes = newGlist.recipes.filter((rec) => rec !== payload);
            return this.firestoreService.updateDocument(this.tableName, newGlist, [user.id, this.subCollectionName]).pipe(
              switchMap(() => of(fromGlist.actions.deleteRecipeFromGlistSuccess(payload))),
              catchError((err) => of(fromGlist.actions.deleteRecipeFromGlistError(err)))
            );
          })
        );
      })
    )
  );

  clearGlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGlist.actions.clearGlist),
      withLatestFrom(this.store, (payload, state) => {
        return { state: state[fromGlist.glistSliceName], payload };
      }),
      switchMap(({ state }) => {
        return this.userFacadeService.user$.pipe(
          switchMap((user) => {
            const newGlist: Glist = { ...state.glist, recipes: [], ingredients: [] };
            return this.firestoreService.updateDocument(this.tableName, newGlist, [user.id, this.subCollectionName]).pipe(
              switchMap(() => of(fromGlist.actions.clearGlistSuccess())),
              catchError((err) => of(fromGlist.actions.clearGlistError(err)))
            );
          })
        );
      })
    )
  );

  addIngredientToGlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGlist.actions.addIngredientToGlist),
      map(({ payload }) => payload),
      withLatestFrom(this.store, (payload, state) => {
        return { state: state[fromGlist.glistSliceName], payload };
      }),
      switchMap(({ state, payload }) => {
        return this.userFacadeService.user$.pipe(
          switchMap((user) => {
            const newGlist: Glist = deepCopy(state.glist);
            newGlist.ingredients.push(payload);
            return this.firestoreService.updateDocument(this.tableName, newGlist, [user.id, this.subCollectionName]).pipe(
              switchMap(() => of(fromGlist.actions.addIngredientToGlistSuccess(payload))),
              catchError((err) => of(fromGlist.actions.addIngredientToGlistError(err)))
            );
          })
        );
      })
    )
  );

  deleteIngredientFromGlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGlist.actions.deleteIngredientFromGlist),
      map(({ payload }) => payload),
      withLatestFrom(this.store, (payload, state) => {
        return { state: state[fromGlist.glistSliceName], payload };
      }),
      switchMap(({ state, payload }) => {
        return this.userFacadeService.user$.pipe(
          switchMap((user) => {
            const newGlist: Glist = { ...state.glist };
            console.log('before filter');
            console.log(newGlist.ingredients.length);
            newGlist.ingredients = newGlist.ingredients.filter((ingredient) => ingredient.name !== payload.name);
            console.log('after filter');
            console.log(newGlist.ingredients.length);
            return this.firestoreService.updateDocument(this.tableName, newGlist, [user.id, this.subCollectionName]).pipe(
              switchMap(() => of(fromGlist.actions.deleteIngredientFromGlistSuccess(payload))),
              catchError((err) => of(fromGlist.actions.deleteIngredientFromGlistError(err)))
            );
          })
        );
      })
    )
  );

  updateIngredientFromList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromGlist.actions.updateIngredientFromGlist),
      map(({ payload }) => payload),
      withLatestFrom(this.store, (payload, state) => {
        return { state: state[fromGlist.glistSliceName], payload };
      }),
      switchMap(({ state, payload }) => {
        return this.userFacadeService.user$.pipe(
          switchMap((user) => {
            const newGlist: Glist = { ...state.glist };
            const foundIngredientIndex = newGlist.ingredients.findIndex((ingredient) => ingredient.name === payload.name);
            if (foundIngredientIndex > -1) {
              newGlist.ingredients[foundIngredientIndex] = { ...newGlist.ingredients[foundIngredientIndex], ...payload };
              return this.firestoreService.updateDocument(this.tableName, newGlist, [user.id, this.subCollectionName]).pipe(
                switchMap(() => of(fromGlist.actions.updateIngredientFromGlistSuccess(payload))),
                catchError((err) => of(fromGlist.actions.updateIngredientFromGlistError(err)))
              );
            }
            return of(
              fromGlist.actions.updateIngredientFromGlistError(
                new Error('That ingredient does not exist in the list so it cannot be updated')
              )
            );
          })
        );
      })
    )
  );
}
