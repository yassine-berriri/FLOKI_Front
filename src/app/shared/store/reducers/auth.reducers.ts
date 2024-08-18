import { createReducer, on } from '@ngrx/store';
import { signupSender, signupTransporter, signupSenderSuccess, signupSenderFailure,
  signupTransporterSuccess, signupTransporterFailure, resetAuthState,
  showLoader,
  hideLoader
 } from '../actions/auth.actions';
import { Sender } from '../models/Sender';
import { Transporter } from '../models/Transporter';

export interface AuthState {
  sender: Sender | null;
  transporter: Transporter | null;
  error: any;
  loading: boolean;
  success: boolean;
}

export const initialState: AuthState = {
  sender: null,
  transporter: null,
  error: null,
  loading: false,
  success: false
};

export const authReducer = createReducer(
  initialState,
  on(signupSender, (state, { sender }) => ({ ...state, sender, loading: true, success: false })),
  on(signupTransporter, (state, { transporter }) => ({ ...state, transporter, loading: true })),
  on(showLoader, state => ({ ...state, loading: true })),
  on(hideLoader, state => ({ ...state, loading: false })),
  on(signupSenderSuccess, (state, { sender }) => ({ ...state, sender, loading: false, success: true })),
  on(signupSenderFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(signupTransporterSuccess, (state, { transporter }) => ({ ...state, transporter, loading: false, error: false, success: true })),
  on(signupTransporterFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(resetAuthState, state => ({ ...state, error: null, loading:false, success: false })),
);
