import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0025Component } from './ic0025.component';

describe('Ic0025Component', () => {
  let component: Ic0025Component;
  let fixture: ComponentFixture<Ic0025Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0025Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
