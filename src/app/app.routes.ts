import { Routes } from '@angular/router';
import { VisitorComponent } from './core/spaces/visitor/visitor.component';
import { TransporterComponent } from './core/spaces/transporter/transporter.component';
import { SenderComponent } from './core/spaces/sender/sender.component';
import { LoginComponent } from './core/views/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SignupComponent } from './core/views/signup/signup.component';

export const routes: Routes = [
    { path: '', component: VisitorComponent },
    { path: 'transporter', component: TransporterComponent, canActivate: [AuthGuard] },
    { path: 'sender', component: SenderComponent, canActivate: [AuthGuard] },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: SignupComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
