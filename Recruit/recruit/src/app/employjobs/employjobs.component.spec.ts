import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployjobsComponent } from './employjobs.component';

describe('EmployjobsComponent', () => {
  let component: EmployjobsComponent;
  let fixture: ComponentFixture<EmployjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
