import { createReducer, on } from '@ngrx/store';
import { signupSender, signupTransporter } from '../actions/auth.actions';
import { Sender } from '../models/Sender';
import { Transporter } from '../models/Transporter';

export interface AuthState {
  sender: Sender | null;
  transporter: Transporter | null;
}

export const initialState: AuthState = {
  sender: null,
  transporter: null
};

export const authReducer = createReducer(
  initialState,
  on(signupSender, (state, { sender }) => ({ ...state, sender })),
  on(signupTransporter, (state, { transporter }) => ({ ...state, transporter }))
);
