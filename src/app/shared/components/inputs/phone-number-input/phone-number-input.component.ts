import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-phone-number-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    NgxMaterialIntlTelInputComponent,
    SharedModule
  ],
  templateUrl: './phone-number-input.component.html',
  styleUrls: ['./phone-number-input.component.scss']
})
export class PhoneNumberInputComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phoneNumber: ['', Validators.required]
    });
  }
}
