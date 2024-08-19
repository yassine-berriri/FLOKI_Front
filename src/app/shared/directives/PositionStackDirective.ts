import { Directive, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appPositionStack]'
})
export class PositionStackDirective  {

  @Output() addressChange: EventEmitter<any[]> = new EventEmitter();

  constructor() {}

  someMethod() {
    const options = this.getOptionsFromService(); // replace this with the actual method
    this.addressChange.emit(options); // Ensure this emits an array
  }

  getOptionsFromService(): any[] {
    // Mock implementation to get options
    return [
      { name: 'Location1', region: 'Region1', country: 'Country1' },
      { name: 'Location2', region: 'Region2', country: 'Country2' }
    ];
  }
}