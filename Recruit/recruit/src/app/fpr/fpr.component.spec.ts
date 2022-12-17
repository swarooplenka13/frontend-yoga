import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FprComponent } from './fpr.component';

describe('FprComponent', () => {
  let component: FprComponent;
  let fixture: ComponentFixture<FprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
