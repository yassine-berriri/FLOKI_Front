
import { createReducer, on } from '@ngrx/store';
import { Ship } from '../models/Ship';
import * as ShipActions from '../actions/ship.actions';

export interface ShipState {
    ships: Ship[];
  }
  
  export const initialState: ShipState = {
    ships: [],
  };
  
  export const shipReducer = createReducer(
    initialState,
    on(ShipActions.loadShips, state => state),
    on(ShipActions.addShip, (state, { ship }) => ({
      ...state,
      ships: [...state.ships, ship]
    })),
    on(ShipActions.removeShip, (state, { id }) => ({
      ...state,
      ships: state.ships.filter(ship => ship.id !== id)
    }))
  );