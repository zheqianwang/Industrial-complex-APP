import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSummaryComponent } from './alarm-summary.component';

describe('AlarmSummaryComponent', () => {
  let component: AlarmSummaryComponent;
  let fixture: ComponentFixture<AlarmSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
