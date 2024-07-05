import { Component, signal, Signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userType = signal<string | null>('sender');
  
  selectUserType(userType: string) {
    this.userType.set(userType);
  }
}
