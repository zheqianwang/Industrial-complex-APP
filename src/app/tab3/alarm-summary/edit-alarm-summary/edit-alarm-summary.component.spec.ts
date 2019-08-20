import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlarmSummaryComponent } from './edit-alarm-summary.component';

describe('EditAlarmSummaryComponent', () => {
  let component: EditAlarmSummaryComponent;
  let fixture: ComponentFixture<EditAlarmSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAlarmSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlarmSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
