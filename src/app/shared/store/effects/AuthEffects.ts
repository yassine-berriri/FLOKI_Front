import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';

import { 
    signupSender, signupSenderSuccess, signupSenderFailure, 
    signupTransporter, signupTransporterSuccess, signupTransporterFailure 
  } from '../actions/auth.actions';
  import { catchError, map, mergeMap } from 'rxjs/operators';
  import { of } from 'rxjs';

  @Injectable()
  export class AuthEffects {
  
    constructor(
      private actions$: Actions,
      private authService: AuthService
    ) {}
  
    signupSender$ = createEffect(() => this.actions$.pipe(
      ofType(signupSender),
      mergeMap(action =>
        this.authService.signupSender(action.sender).pipe(
          map(sender => signupSenderSuccess({ sender })),
          catchError(error => of(signupSenderFailure({ error })))
        )
      )
    ));
  
    signupTransporter$ = createEffect(() => this.actions$.pipe(
      ofType(signupTransporter),
      mergeMap(action =>
        this.authService.signupTransporter(action.transporter).pipe(
          map(transporter => signupTransporterSuccess({ transporter })),
          catchError(error => of(signupTransporterFailure({ error })))
        )
      )
    ));
  }

