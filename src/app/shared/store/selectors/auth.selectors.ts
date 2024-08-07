import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectSender = createSelector(
  selectAuthState,
  (state: AuthState) => state.sender
);

export const selectTransporter = createSelector(
  selectAuthState,
  (state: AuthState) => state.transporter
);


export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error!
);

