import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo2Page } from './demo2.page';

describe('Demo2Page', () => {
  let component: Demo2Page;
  let fixture: ComponentFixture<Demo2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
