import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofactorauthrComponent } from './twofactorauthr.component';

describe('TwofactorauthrComponent', () => {
  let component: TwofactorauthrComponent;
  let fixture: ComponentFixture<TwofactorauthrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwofactorauthrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwofactorauthrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
