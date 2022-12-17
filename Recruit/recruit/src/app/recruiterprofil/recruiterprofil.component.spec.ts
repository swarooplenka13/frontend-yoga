import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterprofilComponent } from './recruiterprofil.component';

describe('RecruiterprofilComponent', () => {
  let component: RecruiterprofilComponent;
  let fixture: ComponentFixture<RecruiterprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
