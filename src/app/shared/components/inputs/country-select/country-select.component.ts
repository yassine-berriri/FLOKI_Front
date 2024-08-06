import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, AbstractControl } from '@angular/forms';
import { CountryService } from '../../../services/country.service';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-country-select',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {
  @Input() selectedCountry: string = '';
  @Output() countryChange = new EventEmitter<string>(); // Événement de changement de valeur

  countries: any[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCountry = selectElement.value;
    this.countryChange.emit(this.selectedCountry); // Émettre l'événement
  }
}
