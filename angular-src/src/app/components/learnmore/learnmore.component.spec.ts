/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LearnmoreComponent } from './learnmore.component';

describe('LearnmoreComponent', () => {
  let component: LearnmoreComponent;
  let fixture: ComponentFixture<LearnmoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnmoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
