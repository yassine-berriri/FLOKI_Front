import { Component, signal, Signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PhoneNumberInputComponent } from '../../../shared/components/inputs/phone-number-input/phone-number-input.component';
import { CountrySelectComponent } from '../../../shared/components/inputs/country-select/country-select.component';
import { Store } from '@ngrx/store';
import { Sender } from '../../../shared/store/models/Sender';
import { signupSender, signupTransporter } from '../../../shared/store/actions/auth.actions';
import { Console } from 'console';
import { selectSender } from '../../../shared/store/selectors/auth.selectors';
import { Observable } from 'rxjs';

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
  senderForm: FormGroup;
 // transporterForm: FormGroup;
 //    sender$: Observable<Sender | null>;
  constructor(private fb: FormBuilder, private store: Store){
    console.log("chui dans constructeur");
    this.senderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      //phoneNumber: ['', Validators.required]
    });
   // this.authError$ = this.store.select(selectAuthError);
  // this.sender$ = this.store.select(selectSender);
  // console.log("constructeur this.sender$ = ", this.sender$);
  }
  
  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;



  selectUserType(userType: string) {
    console.log()
    this.userType.set(userType);
  }
 

  signup() {
    console.log("userType = ", this.userType());
    if (this.userType != null && this.userType() == "sender") {
      if (this.senderForm.valid) {
        console.log("this.senderForm.valid");
        const sender = new Sender(
          this.senderForm.value.firstName,
          this.senderForm.value.lastName,
          this.senderForm.value.email,
          this.senderForm.value.password,
          this.senderForm.value.phoneNumber
        );
        console.log("sender = ", sender);
        this.store.dispatch(signupSender({ sender }));

       
      }
    } else {
      /*
      if (this.transporterForm.valid) {
        const transporter = new Transporter(
          this.transporterForm.value.firstName,
          this.transporterForm.value.lastName,
          this.transporterForm.value.email,
          this.transporterForm.value.phoneNumber,
          this.transporterForm.value.address,
          this.transporterForm.value.city,
          this.transporterForm.value.country,
          this.transporterForm.value.zipCode,
          this.transporterForm.value.username,
          this.transporterForm.value.password
        );

        this.store.dispatch(signupTransporter({ transporter }));
      }
        */
    }
  }

}
