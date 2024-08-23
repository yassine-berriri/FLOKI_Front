import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl, FormArray, AbstractControl} from '@angular/forms';
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
import { VehicleType } from '../../../shared/store/models/VehicleType';
import { Vehicle } from '../../../shared/store/models/Vehicle';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { VehiclePerType } from '../../../shared/store/models/VehiclePerTyper';
import { KindUnit } from '../../../shared/store/models/Paiement';


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
    VehicleTypeListComponent,
    MatSelectModule
    
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
  vehicleInfoFormItem!: FormGroup;
  ships$: Observable<Ship[]>;
  today = new Date();
  options: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']; // Example options
  filteredOptionsStartL!: Observable<string[]>;
  filteredOptionsEndL!: Observable<string[]>;
  filteredOptionsMake: Observable<string[]>[] = [];

  listSelectedVehicleTypes: any[] = [];
  vehicleList: Vehicle[]= [];
  vehiclePerTypeList: VehiclePerType[] = [];
  currencyUnits = KindUnit;
  
  selectedVehicleType: any;
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


    /*
    this.vehicleInfoFormGroup = this.fb.group({
      vehicleTypes: this.fb.array([]),
    });*/
 

    this.additionalInfoFormGroup = this.fb.group({
      availableSpace: [0, Validators.required],
      maxWeight: [0, Validators.required],
      pricePerParcel: [0, Validators.required],
      phoneNumber: ['', Validators.required],
    });
    

 

    //this.setVehicleFormGroups(this.vehicleInfoFormGroup.get('quantity')!.value);


  
    this.filteredOptionsStartL = this.basicInfoFormGroup.get('startLocation')!.valueChanges.pipe(
      debounceTime(500),  // Add a debounce time to avoid making too many API calls
      switchMap(value => this.locationService.searchLocation(value))
    );
   

   this.filteredOptionsEndL = this.basicInfoFormGroup.get('endLocation')!.valueChanges.pipe(
    debounceTime(500),  
    switchMap(value => this.locationService.searchLocation(value))
  );
    
  //this.subscribeToMakeValueChanges();

  }

  subscribeToMakeValueChanges() {
    const vehiclesArray = this.vehicleInfoFormGroup.get('vehicles') as FormArray;
  
    vehiclesArray.controls.forEach((control: AbstractControl, index: number) => {
      const group = control as FormGroup;
      const makeControl = group.get('make');
      if (makeControl) {
        makeControl.valueChanges.pipe(
          debounceTime(500),
          switchMap(value => this.carService.getVehicleMake(value))
        ).subscribe(options => {
        this.filteredOptionsMake[index] = options;
        });
      }
    });
  }


  

onSubmit() {
  const ship: Ship = {
    id: new Date().getTime(), 
    startLocation: this.basicInfoFormGroup.value.startLocation,
    endLocation: this.basicInfoFormGroup.value.endLocation,
    startDate: (this.basicInfoFormGroup.value.startDate as _moment.Moment).toDate(),
    endDate: (this.basicInfoFormGroup.value.endDate as _moment.Moment).toDate(),
    vehicle: this.vehiclePerTypeList,
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



addVehicleType(type: string) {
  const vehiclePerType: VehiclePerType = {
    type: type,
    quantity: 1, // Default quantity
    vehicles: [{ make: '', model: '', maxWeight: 0, pricePerKilo: ({ price: 0, unit: KindUnit.euro}) }] // Start with one empty vehicle
  };

  this.vehiclePerTypeList.push(vehiclePerType);
}

removeVehicleType(type: string) {
  this.vehiclePerTypeList = this.vehiclePerTypeList.filter(vehiclePerType => vehiclePerType.type !== type);
}

onVehicleTypeSelected(item: VehicleType) {
  this.addVehicleType(item.title);
  //vehicles.push(this.fb.array([]));
  
  this.selectedVehicleType = item;
  this.listSelectedVehicleTypes.push(item);
  console.log('Selected Vehicle Type:', this.selectedVehicleType);
  console.log('List of Selected Vehicle Types:', this.listSelectedVehicleTypes);
  // Vous pouvez maintenant faire quelque chose avec l'élément sélectionné
}

setVehicleFormGroups(vehicleTypeFormGroup: FormGroup, quantity: number) {
  const vehiclesFormArray = vehicleTypeFormGroup.get('vehicles') as FormArray;
  vehiclesFormArray.clear();

  for (let i = 0; i < quantity; i++) {
    vehiclesFormArray.push(this.createVehicleFormGroup());
  }
}

createVehiclePerTypeFormGroup(type: String): FormGroup {
  return this.fb.group({
    type: [type, Validators.required],
    quantity: [1, Validators.required],
    vehicles: this.fb.array([]),
  });
}

createVehicleFormGroup(): FormGroup {
  return this.fb.group({
    make: [''],
    model: [''],

  });
}

onVehicleTypeUnselected(item: VehicleType) {
  this.removeVehicleType(item.title);
}

onQuantityChange(index: number, event: MatSelectChange) {
  const quantity = event.value as number;
  const vehiclePerType = this.vehiclePerTypeList[index];
  vehiclePerType.quantity = quantity;

  // Adjust the number of vehicles in the list based on the quantity
  const currentLength = vehiclePerType.vehicles.length;
  if (quantity > currentLength) {
    for (let i = currentLength; i < quantity; i++) {
      vehiclePerType.vehicles.push({ make: '', model: '', maxWeight: 0, pricePerKilo: ({ price: 0, unit: KindUnit.euro}) });
    }
  } else {
    vehiclePerType.vehicles.splice(quantity, currentLength - quantity);
  }
}

getVehicleArray(index: number): FormArray {
  return (this.vehicleInfoFormGroup.get('vehicles') as FormArray).at(index) as FormArray;
}



getVehicleControls(vehicleTypeGroup: AbstractControl): AbstractControl[] {
  const vehiclesFormArray = vehicleTypeGroup.get('vehicles') as FormArray;
  return vehiclesFormArray ? vehiclesFormArray.controls : [];
}



}
