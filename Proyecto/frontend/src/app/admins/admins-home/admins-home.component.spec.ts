import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsHomeComponent } from './admins-home.component';

describe('AdminsHomeComponent', () => {
  let component: AdminsHomeComponent;
  let fixture: ComponentFixture<AdminsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
