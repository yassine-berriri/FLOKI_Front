import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-vehicle-type-item',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './vehicle-type-item.component.html',
  styleUrl: './vehicle-type-item.component.scss'
})
export class VehicleTypeItemComponent {
  @Input() imageUrl: string = "";
  @Input() title: string = "";
  @Input() isSelected: boolean = false;

  @Output() itemSelected: EventEmitter<void> = new EventEmitter<void>();

  onItemClicked() {
    this.isSelected = !this.isSelected;
    this.itemSelected.emit();
  }
}
