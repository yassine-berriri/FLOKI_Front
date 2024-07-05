import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { share } from 'rxjs';
import { SharedModule } from '../../shared.module';
import { FooterComponent } from '../footer/footer.component';
import { ButtonCustomComponent } from '../button-custom/button-custom.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, SharedModule, FooterComponent, ButtonCustomComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router) { }

  closeSideNav(){
    this.sidenav.close();
  }


}
