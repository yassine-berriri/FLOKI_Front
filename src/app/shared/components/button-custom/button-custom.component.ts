import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';

type ButtonVariant = 'basic' | 'raised' | 'flat' | 'icon' | 'stroked' | 'fab' | 'mini-fab';


@Component({
  selector: 'app-button-custom',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './button-custom.component.html',
  styleUrl: './button-custom.component.scss'
})
export class ButtonCustomComponent {
 @Input() variant: ButtonVariant = 'basic';

 getButtonClass() {
  switch (this.variant) {
    case 'raised':
      return 'mat-raised-button';
    case 'flat':
      return 'mat-flat-button';
    case 'icon':
      return 'mat-icon-button';
    case 'stroked':
      return 'mat-stroked-button';
    case 'fab':
      return 'mat-fab';
    case 'mini-fab':
      return 'mat-mini-fab';
    default:
      return 'mat-button';
    }
  }
  
}
