import { Component, signal, Signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, Validators} from '@angular/forms';
import { PhoneNumberInputComponent } from '../../../shared/components/inputs/phone-number-input/phone-number-input.component';
import { CountrySelectComponent } from '../../../shared/components/inputs/country-select/country-select.component';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    PhoneNumberInputComponent,
    CountrySelectComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userType = signal<string | null>('sender');

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}

  selectUserType(userType: string) {
    this.userType.set(userType);
  }
}
