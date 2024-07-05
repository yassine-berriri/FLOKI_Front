import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonCustomComponent } from '../../../shared/components/button-custom/button-custom.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, SharedModule, ButtonCustomComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
