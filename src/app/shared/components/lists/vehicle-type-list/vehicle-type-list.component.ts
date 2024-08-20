import { Component } from '@angular/core';
import { VehicleTypeItemComponent } from '../../items/vehicle-type-item/vehicle-type-item.component';

@Component({
  selector: 'app-vehicle-type-list',
  standalone: true,
  imports: [VehicleTypeItemComponent],
  templateUrl: './vehicle-type-list.component.html',
  styleUrl: './vehicle-type-list.component.scss'
})
export class VehicleTypeListComponent {
  items = [
    { id: 1, imageUrl: '../../../../../assets/camion.webp', title: 'Item 1', isSelected: false },
    { id: 2, imageUrl: 'https://via.placeholder.com/500', title: 'Item 2', isSelected: false },
    { id: 3, imageUrl: 'https://via.placeholder.com/500', title: 'Item 3', isSelected: false },
  ];

  onItemSelected(index: number) {
    this.items[index].isSelected = !this.items[index].isSelected;
  }

  getSelectedItems() {
    return this.items.filter(item => item.isSelected);
  }
}
