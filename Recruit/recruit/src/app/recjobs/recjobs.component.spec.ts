import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecjobsComponent } from './recjobs.component';

describe('RecjobsComponent', () => {
  let component: RecjobsComponent;
  let fixture: ComponentFixture<RecjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecjobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
