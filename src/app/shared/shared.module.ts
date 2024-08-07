import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { app } from '../../../server';
import { ButtonCustomComponent } from './components/button-custom/button-custom.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { provideHttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CountryService } from './services/country.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/reducers/auth.reducers';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/AuthEffects';

// Importez ici d'autres modules que vous voulez partager

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    ReactiveFormsModule,
    
  ],
  providers: [provideHttpClient(), CountryService]
})
export class SharedModule { }
