import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShipState } from '../reducers/ship.reducers';

export const selectShipState = createFeatureSelector<ShipState>('ships');

export const selectAllShips = createSelector(
  selectShipState,
  (state: ShipState) => state.ships
);
