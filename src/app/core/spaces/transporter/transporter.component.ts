import { Component } from '@angular/core';
import { TransporterCreateShipComponent } from '../../views/transporter-create-ship/transporter-create-ship.component';

@Component({
  selector: 'app-transporter',
  standalone: true,
  imports: [TransporterCreateShipComponent],
  templateUrl: './transporter.component.html',
  styleUrl: './transporter.component.scss'
})
export class TransporterComponent {

}
