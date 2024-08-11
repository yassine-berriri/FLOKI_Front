import { createAction, props } from '@ngrx/store';
import { Sender } from '../models/Sender';
import { Transporter } from '../models/Transporter';

export const signupSender = createAction(
  '[Auth] Signup Sender',
  props<{ sender: Sender }>()
);

export const signupSenderSuccess = createAction(
  '[Auth] Signup Sender Success',
  props<{ sender: Sender }>()
);

export const signupSenderFailure = createAction(
  '[Auth] Signup Sender Failure',
  props<{ error: any }>()
);

export const signupTransporter = createAction(
  '[Auth] Signup Transporter',
  props<{ transporter: Transporter }>()
);

export const signupTransporterSuccess = createAction(
  '[Auth] Signup Transporter Success',
  props<{ transporter: Transporter }>()
);

export const signupTransporterFailure = createAction(
  '[Auth] Signup Transporter Failure',
  props<{ error: any }>()
);

export const showLoader = createAction('[Auth] Show Loader');
export const hideLoader = createAction('[Auth] Hide Loader');