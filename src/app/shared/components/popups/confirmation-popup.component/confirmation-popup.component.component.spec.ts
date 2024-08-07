import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPopupComponentComponent } from './confirmation-popup.component.component';

describe('ConfirmationPopupComponentComponent', () => {
  let component: ConfirmationPopupComponentComponent;
  let fixture: ComponentFixture<ConfirmationPopupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationPopupComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationPopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
