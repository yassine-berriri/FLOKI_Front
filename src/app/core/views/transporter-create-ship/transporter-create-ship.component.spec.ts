import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterCreateShipComponent } from './transporter-create-ship.component';

describe('TransporterCreateShipComponent', () => {
  let component: TransporterCreateShipComponent;
  let fixture: ComponentFixture<TransporterCreateShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransporterCreateShipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterCreateShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
