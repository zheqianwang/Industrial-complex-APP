import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo1Page } from './demo1.page';

describe('Demo1Page', () => {
  let component: Demo1Page;
  let fixture: ComponentFixture<Demo1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
