import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  constructor(private http: HttpClient) {}

  getVehicleMake(make: string): Observable<any> {
    if (make === '' || make.length < 2) {
        return of([]);
    }
    return this.http.get(`${this.baseUrl}/GetVehicleTypesForMake/${make}?format=json`).pipe(
        map((response: any) => {
            console.log('API location response:', response);
            if (response.Results != null){
                const uniqueMakes = Array.from(new Set(response.Results.map((item: any) => item.MakeName)));
                return uniqueMakes;
            }
            else {
                throw new Error('No data found');
            }
        })

    );
  }
}
