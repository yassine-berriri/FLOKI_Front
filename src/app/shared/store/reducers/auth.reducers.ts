import { createReducer, on } from '@ngrx/store';
import { signupSender, signupTransporter, signupSenderSuccess, signupSenderFailure,
  signupTransporterSuccess, signupTransporterFailure
 } from '../actions/auth.actions';
import { Sender } from '../models/Sender';
import { Transporter } from '../models/Transporter';

export interface AuthState {
  sender: Sender | null;
  transporter: Transporter | null;
  error: any;
}

export const initialState: AuthState = {
  sender: null,
  transporter: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(signupSender, (state, { sender }) => ({ ...state, sender })),
  on(signupSenderSuccess, (state, { sender }) => ({ ...state, sender })),
  on(signupSenderFailure, (state, { error }) => ({ ...state, error })),
  on(signupTransporter, (state, { transporter }) => ({ ...state, transporter })),
  on(signupTransporterSuccess, (state, { transporter }) => ({ ...state, transporter })),
  on(signupTransporterFailure, (state, { error }) => ({ ...state, error }))
);
