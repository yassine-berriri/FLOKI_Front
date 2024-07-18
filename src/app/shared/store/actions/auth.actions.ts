import { createAction, props } from '@ngrx/store';
import { Sender } from '../models/Sender';
import { Transporter } from '../models/Transporter';

export const signupSender = createAction(
  '[Auth] Signup Sender',
  props<{ sender: Sender }>()
);

export const signupTransporter = createAction(
  '[Auth] Signup Transporter',
  props<{ transporter: Transporter }>()
);
