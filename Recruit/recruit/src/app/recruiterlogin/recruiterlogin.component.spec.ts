import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterloginComponent } from './recruiterlogin.component';

describe('RecruiterloginComponent', () => {
  let component: RecruiterloginComponent;
  let fixture: ComponentFixture<RecruiterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
