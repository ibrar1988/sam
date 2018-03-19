import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0027Component } from './ic0027.component';

describe('Ic0027Component', () => {
  let component: Ic0027Component;
  let fixture: ComponentFixture<Ic0027Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0027Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0027Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
