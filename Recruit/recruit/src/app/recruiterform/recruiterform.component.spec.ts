import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterformComponent } from './recruiterform.component';

describe('RecruiterformComponent', () => {
  let component: RecruiterformComponent;
  let fixture: ComponentFixture<RecruiterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
