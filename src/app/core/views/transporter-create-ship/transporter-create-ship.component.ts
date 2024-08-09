import { Component } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import moment, * as _moment from 'moment';
import { MatMomentDateModule,   MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {DatePipe} from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ship } from '../../../shared/store/models/Ship';
import { selectAllShips } from './../../../shared/store/selectors/ship.selectors';
import * as ShipActions from '../../../shared/store/actions/ship.actions';

@Component({
  selector: 'app-transporter-create-ship',
  standalone: true,
  imports: [  MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    DatePipe
  ],
    providers: [
      { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    ],
  templateUrl: './transporter-create-ship.component.html',
  styleUrl: './transporter-create-ship.component.scss'
})
export class TransporterCreateShipComponent {

 basicInfoFormGroup!: FormGroup;
  vehicleInfoFormGroup!: FormGroup;
  additionalInfoFormGroup!: FormGroup;
  ships$: Observable<Ship[]>;
  today = new Date();

  constructor(private fb: FormBuilder, private store: Store) {
    this.ships$ = this.store.select(selectAllShips);
    console.log("ships", this.ships$);
  }

  ngOnInit() {
    this.basicInfoFormGroup = this.fb.group({
      startLocation: ['', Validators.required],
      endLocation: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.vehicleInfoFormGroup = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
    });

    this.additionalInfoFormGroup = this.fb.group({
      availableSpace: [0, Validators.required],
      maxWeight: [0, Validators.required],
      pricePerParcel: [0, Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

onSubmit() {
  const ship: Ship = {
    id: new Date().getTime(), 
    startLocation: this.basicInfoFormGroup.value.startLocation,
    endLocation: this.basicInfoFormGroup.value.endLocation,
    startDate: (this.basicInfoFormGroup.value.startDate as _moment.Moment).toDate(),
    endDate: (this.basicInfoFormGroup.value.endDate as _moment.Moment).toDate(),
    vehicle: this.vehicleInfoFormGroup.value,
    availableSpace: this.additionalInfoFormGroup.value.availableSpace,
    maxWeight: this.additionalInfoFormGroup.value.maxWeight,
    pricePerParcel: this.additionalInfoFormGroup.value.pricePerParcel,
    phoneNumber: this.additionalInfoFormGroup.value.phoneNumber.split(',').map((num: string) => num.trim())
  };
  console.log("ship", ship);
  this.store.dispatch(ShipActions.addShip({ ship }));


  // To verify the action
  this.store.select(selectAllShips).subscribe(ship => {
    console.log('Added ship:', ship);
  });

}

}
