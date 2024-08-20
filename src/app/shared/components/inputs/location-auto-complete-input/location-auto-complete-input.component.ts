import { Component, Input, OnInit, Self, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, NgControl, Validators  } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { LocationService } from '../../../services/location.service'; 
import { MatAutocomplete, MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../../shared.module';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-location-auto-complete-input',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatOption,
    SharedModule,
    MatInputModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationAutoCompleteInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LocationAutoCompleteInputComponent),
      multi: true
    }
  ],
  templateUrl: './location-auto-complete-input.component.html',
  styleUrl: './location-auto-complete-input.component.scss'
})
export class LocationAutoCompleteInputComponent  {
 
}
