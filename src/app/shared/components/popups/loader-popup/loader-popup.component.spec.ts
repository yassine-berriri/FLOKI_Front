import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderPopupComponent } from './loader-popup.component';

describe('LoaderPopupComponent', () => {
  let component: LoaderPopupComponent;
  let fixture: ComponentFixture<LoaderPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
