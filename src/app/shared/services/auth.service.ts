import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: 'visitor' | 'transporter' | 'sender'  = 'visitor';

  constructor() {}

  login(role: 'transporter' | 'sender') {
    this.userRole = role;
  }

  getRole(): 'visitor' | 'transporter' | 'sender' {
    return this.userRole;
  }
}
