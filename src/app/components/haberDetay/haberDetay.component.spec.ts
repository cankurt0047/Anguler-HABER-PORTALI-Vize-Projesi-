/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HaberDetayComponent } from './haberDetay.component';

describe('HaberDetayComponent', () => {
  let component: HaberDetayComponent;
  let fixture: ComponentFixture<HaberDetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaberDetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaberDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
