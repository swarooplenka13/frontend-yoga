import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofactorauthemployeeComponent } from './twofactorauthemployee.component';

describe('TwofactorauthemployeeComponent', () => {
  let component: TwofactorauthemployeeComponent;
  let fixture: ComponentFixture<TwofactorauthemployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwofactorauthemployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwofactorauthemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
