import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWeekCalendarComponent } from './two-week-calendar.component';

describe('TwoWeekCalendarComponent', () => {
  let component: TwoWeekCalendarComponent;
  let fixture: ComponentFixture<TwoWeekCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoWeekCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWeekCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
