import { Component, Output, EventEmitter } from '@angular/core';
import { VehicleTypeItemComponent } from '../../items/vehicle-type-item/vehicle-type-item.component';
import { SharedModule } from '../../../shared.module';


@Component({
  selector: 'app-vehicle-type-list',
  standalone: true,
  imports: [VehicleTypeItemComponent, SharedModule],
  templateUrl: './vehicle-type-list.component.html',
  styleUrl: './vehicle-type-list.component.scss'
})
export class VehicleTypeListComponent {
  items = [
    { id: 1, imageUrl: 'assets/camion.webp', title: 'Truck (Camion)', isSelected: false },
    { id: 2, imageUrl: 'assets/Van (Fourgonnette).webp', title: 'Van (Fourgonnette)', isSelected: false },
    { id: 3, imageUrl: 'assets/Camion à plateau (Flatbed Truck).webp', title: 'Flatbed Truck (Camion à plateau)', isSelected: false },
    //{ id: 4, imageUrl: 'assets/Multipurpose Passenger Vehicle (MPV).webp', title: 'Multipurpose Passenger Vehicle (MPV)', isSelected: false },
    { id: 4, imageUrl: 'assets/carVoitureNormal.webp', title: 'Car (voiture)', isSelected: false },
    { id: 5, imageUrl: 'assets/Camionnette (Pickup Truck).webp', title: 'Pickup Truck (Camionnette)', isSelected: false },
    { id: 6, imageUrl: 'assets/Camion frigorifique (Refrigerated Truck) .webp', title: 'Refrigerated Truck (Camion frigorifique)', isSelected: false },
  ];

  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemUnselected: EventEmitter<any> = new EventEmitter<any>();


  onItemSelected(index: number) {
    const item = this.items[index];
    
    if (item.isSelected) {
      this.itemUnselected.emit(item);
    } else {
      this.itemSelected.emit(item);
    }
    
    item.isSelected = !item.isSelected;
  }

  getSelectedItems() {
    return this.items.filter(item => item.isSelected);
  }
}
