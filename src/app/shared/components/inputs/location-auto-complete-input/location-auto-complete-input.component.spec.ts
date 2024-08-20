import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAutoCompleteInputComponent } from './location-auto-complete-input.component';

describe('LocationAutoCompleteInputComponent', () => {
  let component: LocationAutoCompleteInputComponent;
  let fixture: ComponentFixture<LocationAutoCompleteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationAutoCompleteInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationAutoCompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
