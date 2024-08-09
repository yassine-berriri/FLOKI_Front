import { Injectable } from '@angular/core';
import { Sender } from '../store/models/Sender';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Transporter } from '../store/models/Transporter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; 

  private userRole: 'visitor' | 'transporter' | 'sender'  = 'visitor';

  constructor(private http: HttpClient) {}

  login(role: 'transporter' | 'sender') {
    this.userRole = role;
  }

  getRole(): 'visitor' | 'transporter' | 'sender' {
    return this.userRole;
  }

  isAuthenticated(): boolean {
    return !!this.getRole(); 
  }

  signupSender(sender: Sender): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/sender`, sender).pipe(
      catchError(this.handleError)
    );
  }

  signupTransporter(transporter: Transporter): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup/transporter`, transporter).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
