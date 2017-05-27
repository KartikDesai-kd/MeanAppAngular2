/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarttrackingComponent } from './starttracking.component';

describe('StarttrackingComponent', () => {
  let component: StarttrackingComponent;
  let fixture: ComponentFixture<StarttrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarttrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarttrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
