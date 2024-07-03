import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();
    if (route.routeConfig?.path === 'transporter' && role === 'transporter') {
      return true;
    } else if (route.routeConfig?.path === 'sender' && role === 'sender') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
