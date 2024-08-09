import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the correct module for Router
import { AuthService } from '../../../shared/services/auth.service';
import { ShipsTableComponent } from '../../../shared/components/tables/ships-table/ships-table.component';

@Component({
  selector: 'app-visitor',
  standalone: true,
  imports: [ShipsTableComponent],
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.scss'
})
export class VisitorComponent {

  constructor(private router: Router, private authService: AuthService){}

  handleClick() {
    this.authService.login('transporter');
    this.router.navigate(['transporter']);
  }

}
