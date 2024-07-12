import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
}

@Injectable({
    providedIn: 'root'
  })
  export class CountryService {
  
    constructor(private http: HttpClient) { }
  
    getCountries(): Observable<Country[]> {
      return this.http.get<Country[]>('https://restcountries.com/v3.1/all').pipe(
        map((countries: Country[]) => 
          countries.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common))
        )
      );
    }
  }