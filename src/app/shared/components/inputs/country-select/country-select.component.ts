import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  countries: any[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    this.form = this.fb.group({
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
