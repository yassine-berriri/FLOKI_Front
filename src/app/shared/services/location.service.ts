import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://api.positionstack.com/v1/forward';
  private apiKey = 'acc2e543e373b80b4ee93db77636fe95';  // Replace with your PositionStack API key

  constructor(private http: HttpClient) {}

  searchLocation(query: string, limit: number = 5): Observable<string[]> {
    console.log("query", query);
    if (!query.trim() || query.length < 3) {
      console.log('Query is empty, request canceled.');
      return of([]); 
    }

    const params = new HttpParams()
      .set('access_key', this.apiKey)
      .set('query', query)
      .set('limit', limit.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        console.log('API response:', response);  // Log the response for debugging
        if (response.data) {
          return response.data.map((item: any) => `${item.name}, ${item.region}, ${item.country}`);
        } else {
          throw new Error('No data found');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
