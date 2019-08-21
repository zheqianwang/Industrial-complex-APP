import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmStrategyListComponent } from './alarm-strategy-list.component';

describe('AlarmStrategyListComponent', () => {
  let component: AlarmStrategyListComponent;
  let fixture: ComponentFixture<AlarmStrategyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmStrategyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmStrategyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
