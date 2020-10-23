import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeComponent } from './vende.component';

describe('VendeComponent', () => {
  let component: VendeComponent;
  let fixture: ComponentFixture<VendeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
