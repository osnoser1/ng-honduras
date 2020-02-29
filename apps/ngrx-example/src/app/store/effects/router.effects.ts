import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as fromRouterActions from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRouterActions.go),
        tap(({ path, query: queryParams }) => {
          this.router.navigate(path, { queryParams });
        }),
      ),
    { dispatch: false },
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRouterActions.back),
        tap(() => this.location.back()),
      ),
    { dispatch: false },
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRouterActions.forward),
        tap(() => this.location.forward()),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}
}
