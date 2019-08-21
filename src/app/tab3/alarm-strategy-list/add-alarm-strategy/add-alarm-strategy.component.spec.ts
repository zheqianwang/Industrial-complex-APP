import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlarmStrategyComponent } from './add-alarm-strategy.component';

describe('AddAlarmStrategyComponent', () => {
  let component: AddAlarmStrategyComponent;
  let fixture: ComponentFixture<AddAlarmStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlarmStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlarmStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
