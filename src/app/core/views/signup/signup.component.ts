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
import { selectSender, selectTransporter } from '../../../shared/store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { Transporter } from '../../../shared/store/models/Transporter';

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
  transporterFormStepOne: FormGroup;
  transporterFormStepTwo: FormGroup;
  transporterFormStepThree: FormGroup;
  transporter: Transporter = new Transporter();

 //    sender$: Observable<Sender | null>;
  constructor(private fb: FormBuilder, private store: Store) {
    console.log("chui dans constructeur");
    this.senderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      //phoneNumber: ['', Validators.required]
    });

    this.transporterFormStepOne = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.transporterFormStepTwo = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required]
    });

    this.transporterFormStepThree = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  ///  console.log("chui dans constructeur firstName = ", this.transporterFormGroup1!.value.firstName);
   // this.authError$ = this.store.select(selectAuthError);
     console.log("transporter = ",this.store.select(selectTransporter));
  // console.log("constructeur this.sender$ = ", this.sender$);
  }


  onCountryChange(selectedCountry: string): void {
    this.transporterFormStepTwo.patchValue({ country: selectedCountry });
  }
  
  


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
      
      if (this.transporterFormStepOne.valid) {
        this.transporter.firstName = this.transporterFormStepOne.value.firstName,
        this.transporter.lastName = this.transporterFormStepOne.value.lastName,
        this.transporter.email = this.transporterFormStepOne.value.email
        
          
         /* this.transporterForm.value.email,
          this.transporterForm.value.phoneNumber,
          this.transporterForm.value.address,
          this.transporterForm.value.city,
          this.transporterForm.value.country,
          this.transporterForm.value.zipCode,
          this.transporterForm.value.username,
          this.transporterForm.value.password
          */
        
       

      //  this.store.dispatch(signupTransporter({  transporter }));
      }

      if (this.transporterFormStepTwo.valid) {
        this.transporter.address = this.transporterFormStepTwo.value.address || '';
        this.transporter.city = this.transporterFormStepTwo.value.city || '';
        this.transporter.country = this.transporterFormStepTwo.value.country || '';
        this.transporter.zipCode = this.transporterFormStepTwo.value.zipCode || '';
      }

      if (this.transporterFormStepThree.valid) {
        this.transporter.username = this.transporterFormStepThree.value.username || '';
        this.transporter.password = this.transporterFormStepThree.value.password || '';
        this.store.dispatch(signupTransporter({ transporter: this.transporter }));
      }

      console.log("trnasporter = ", this.transporter);
        
    }
  }

}
