import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { ActivatedRoute, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from '../app/shared/store/reducers/auth.reducers'; // Assurez-vous que ce chemin est correct
import { AuthEffects } from '../app/shared/store/effects/AuthEffects'; // Assurez-vous que ce chemin est correct
import { provideHttpClient } from '@angular/common/http';
import { shipReducer } from '../app/shared/store/reducers/ship.reducers'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideStore({
      auth: authReducer,
      ships: shipReducer
    }),
    provideEffects(AuthEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ]
};
