import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0003Component } from './ic0003.component';

describe('Ic0003Component', () => {
  let component: Ic0003Component;
  let fixture: ComponentFixture<Ic0003Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0003Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
