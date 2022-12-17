import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesignupComponent } from './employeesignup.component';

describe('EmployeesignupComponent', () => {
  let component: EmployeesignupComponent;
  let fixture: ComponentFixture<EmployeesignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
