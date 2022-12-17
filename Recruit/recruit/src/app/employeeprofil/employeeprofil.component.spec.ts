import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeprofilComponent } from './employeeprofil.component';

describe('EmployeeprofilComponent', () => {
  let component: EmployeeprofilComponent;
  let fixture: ComponentFixture<EmployeeprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
