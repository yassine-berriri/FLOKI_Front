import { Component, signal, Signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PhoneNumberInputComponent } from '../../../shared/components/inputs/phone-number-input/phone-number-input.component';
import { CountrySelectComponent } from '../../../shared/components/inputs/country-select/country-select.component';
import { select, Store, StoreModule } from '@ngrx/store';
import { Sender } from '../../../shared/store/models/Sender';
import { resetAuthState, signupSender, signupTransporter } from '../../../shared/store/actions/auth.actions';
import { Console } from 'console';
import { selectAuthError, selectAuthSuccess, selectLoading, selectSender, selectTransporter } from '../../../shared/store/selectors/auth.selectors';
import { selectAuthState } from '../../../shared/store/selectors/auth.selectors';

import { Observable, tap } from 'rxjs';
import { Transporter } from '../../../shared/store/models/Transporter';
import { ConfirmationPopupComponentComponent } from '../../../shared/components/popups/confirmation-popup.component/confirmation-popup.component.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoaderPopupComponent } from '../../../shared/components/popups/loader-popup/loader-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { passwordMatchValidator } from '../../../shared/utils/utils';
import { PasswordInputComponent } from '../../../shared/components/inputs/password-input/password-input.component';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    PhoneNumberInputComponent,
    CountrySelectComponent,
    ConfirmationPopupComponentComponent,
    LoaderPopupComponent,
    PasswordInputComponent
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
  error$: Observable<string | null>;
  loading$: Observable<boolean>;
  sender$: Observable<Sender|any>;

  success$: Observable<boolean>;


 //    sender$: Observable<Sender | null>;
  constructor(private fb: FormBuilder, private store: Store, private modalService: NgbModal,
    private router: Router, private dialog: MatDialog
  ) {
    console.log("chui dans constructeur");
    this.senderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],

      //phoneNumber: ['', Validators.required]
    }, { validator: passwordMatchValidator() });

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
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: passwordMatchValidator() });

    this.error$ = this.store.pipe(select(selectAuthError));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.sender$ = this.store.pipe(select(selectSender));
    this.success$ = this.store.pipe(select(selectAuthSuccess));
    
    this.success$.subscribe(success => {
      if (success) {
        this.openSuccessModal();
      }
    });

    this.loading$.subscribe(loading => {
      if (loading) {
        this.showLoading();
      } else {
        this.hideLoading();
        
      }
    });
    this.handleError();
        //this.handleSuccess();
    
   
    
  ///  console.log("chui dans constructeur firstName = ", this.transporterFormGroup1!.value.firstName);
   // this.authError$ = this.store.select(selectAuthError);
     console.log("transporter = ",this.store.select(selectTransporter));
  // console.log("constructeur this.sender$ = ", this.sender$);
  }


  onCountryChange(selectedCountry: string): void {
    this.transporterFormStepTwo.patchValue({ country: selectedCountry });
  }

  handleSuccess() {
    this.sender$.subscribe(sender => {
      if (sender) {
        this.openSuccessModal();
      }
      });
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
        this.onSignupSender(sender)

       
      }
    } else {


      const transporter: Transporter = {
        firstName: this.transporterFormStepOne.value.firstName,
        lastName: this.transporterFormStepOne.value.lastName,
        email: this.transporterFormStepOne.value.email,
        address: this.transporterFormStepTwo.value.address,
        city: this.transporterFormStepTwo.value.city,
        country: this.transporterFormStepTwo.value.country,
        zipCode: this.transporterFormStepTwo.value.zipCode,
        username: this.transporterFormStepThree.value.username,
        password: this.transporterFormStepThree.value.password,
       
      }
      this.onSignupTransporter(transporter);

    }
  }


  onSignupSender(sender: Sender) {
   this.store.dispatch(signupSender({ sender }));
   //this.router.navigate(['/login']); 
  }

  onSignupTransporter(transporter: Transporter) {
    this.store.dispatch(signupTransporter({ transporter }));
  }

  openModal() {
    const modalRef = this.modalService.open(ConfirmationPopupComponentComponent);
    modalRef.componentInstance.title = 'Enter Verification Code';
    modalRef.componentInstance.body = 'Please enter the code you received by email:';
    modalRef.componentInstance.needInput = true;
    modalRef.componentInstance.needChoice = true;
    modalRef.componentInstance.footerButtons = [
      { text: 'Close', action: () => modalRef.close() }
    ];

    modalRef.componentInstance.codeSubmitted.subscribe((code: string) => {
      console.log('Code submitted:', code);
      //this.onSignupTransporter(this.transporter);
      this.router.navigate(['/login']); 
      // You can handle the submitted code here, e.g., send it to a server or store it
    });
  }

  openSuccessModal() {
    const modalRef = this.modalService.open(ConfirmationPopupComponentComponent);
    modalRef.componentInstance.title = 'Success popup';
    modalRef.componentInstance.body = 'Form submitted successfully';
    modalRef.componentInstance.needInput = false;
    modalRef.componentInstance.needChoice = false;
    modalRef.componentInstance.footerButtons = [
      { text: 'Close', action: () => modalRef.close() }
    ];

    this.resetState();


    modalRef.componentInstance.codeSubmitted.subscribe((code: string) => {
      console.log('Code submitted:', code);
      //this.onSignupTransporter(this.transporter);
      this.router.navigate(['/login']); 
      // You can handle the submitted code here, e.g., send it to a server or store it
    });
  }


  handleError() {
    this.error$.subscribe(error => {
      if (error) {
        const modalRef = this.modalService.open(ConfirmationPopupComponentComponent);
        modalRef.componentInstance.title = 'Error';
        modalRef.componentInstance.body = error;
        modalRef.componentInstance.footerButtons = [
          { text: 'Close', action: () => modalRef.close() }
        ];
        this.resetState();
      }
    });
  }

  ngOnInit() {
    //this.handleError();
  }

  showLoading() {
    this.dialog.open(LoaderPopupComponent, { width: '150px', height: '150px', disableClose: true });
  }

  hideLoading() {
    this.dialog.closeAll();
  }


  resetState() {
    this.store.dispatch(resetAuthState());
  }

}
