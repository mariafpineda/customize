import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBrandComponent } from './register-brand.component';

describe('RegisterBrandComponent', () => {
  let component: RegisterBrandComponent;
  let fixture: ComponentFixture<RegisterBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
