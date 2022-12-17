import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpeComponent } from './fpe.component';

describe('FpeComponent', () => {
  let component: FpeComponent;
  let fixture: ComponentFixture<FpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
