import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeItemComponent } from './vehicle-type-item.component';

describe('VehicleTypeItemComponent', () => {
  let component: VehicleTypeItemComponent;
  let fixture: ComponentFixture<VehicleTypeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
