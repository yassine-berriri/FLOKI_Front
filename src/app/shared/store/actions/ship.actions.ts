import { createAction, props } from '@ngrx/store';
import { Ship } from '../models/Ship';

export const loadShips = createAction('[Ship] Load Ships');

export const addShip = createAction(
  '[Ship] Add Ship',
  props<{ ship: Ship }>()
);

export const removeShip = createAction(
  '[Ship] Remove Ship',
  props<{ id: number }>()
);
