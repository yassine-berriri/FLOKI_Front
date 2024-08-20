import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import moment, * as _moment from 'moment';
import { MatMomentDateModule,   MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {DatePipe} from '@angular/common';
import { Store } from '@ngrx/store';
import { debounceTime, map, Observable, startWith, switchMap } from 'rxjs';
import { Ship } from '../../../shared/store/models/Ship';
import { selectAllShips } from './../../../shared/store/selectors/ship.selectors';
import * as ShipActions from '../../../shared/store/actions/ship.actions';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../../../shared/shared.module';
import { LocationService } from '../../../shared/services/location.service';
import { LocationAutoCompleteInputComponent } from '../../../shared/components/inputs/location-auto-complete-input/location-auto-complete-input.component';
import { CarService } from '../../../shared/services/car.service';
import { VehicleTypeListComponent } from '../../../shared/components/lists/vehicle-type-list/vehicle-type-list.component';


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
    DatePipe,
    MatAutocompleteModule,
    SharedModule,
    LocationAutoCompleteInputComponent,
    VehicleTypeListComponent
    
  ],
    providers: [
      { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    ],
  templateUrl: './transporter-create-ship.component.html',
  styleUrl: './transporter-create-ship.component.scss'
})
export class TransporterCreateShipComponent implements OnInit {

 basicInfoFormGroup!: FormGroup;
  vehicleInfoFormGroup!: FormGroup;
  additionalInfoFormGroup!: FormGroup;
  ships$: Observable<Ship[]>;
  today = new Date();
  options: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']; // Example options
  filteredOptionsStartL!: Observable<string[]>;
  filteredOptionsEndL!: Observable<string[]>;
  filteredOptionsMake!: Observable<string[]>;

  constructor(private fb: FormBuilder, private store: Store, private locationService: LocationService, private carService: CarService) {
    this.ships$ = this.store.select(selectAllShips);
    console.log("ships", this.ships$);
  }

  

  ngOnInit() {
    this.basicInfoFormGroup = this.fb.group({
      startLocation: [''],
      endLocation: [''],
      startDate: [''],
      endDate: [''],
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
    
  
    this.filteredOptionsStartL = this.basicInfoFormGroup.get('startLocation')!.valueChanges.pipe(
      debounceTime(500),  // Add a debounce time to avoid making too many API calls
      switchMap(value => this.locationService.searchLocation(value))
    );
   

   this.filteredOptionsEndL = this.basicInfoFormGroup.get('endLocation')!.valueChanges.pipe(
    debounceTime(500),  
    switchMap(value => this.locationService.searchLocation(value))
  );
    
  this.filteredOptionsMake = this.vehicleInfoFormGroup.get('make')!.valueChanges.pipe(
    debounceTime(500),  
    switchMap(value => this.carService.getVehicleMake(value))
  );
  }

  verifStartLocation(): boolean {
    debounceTime(1000)
    return this.basicInfoFormGroup.get('startLocation')!.value === '';
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
