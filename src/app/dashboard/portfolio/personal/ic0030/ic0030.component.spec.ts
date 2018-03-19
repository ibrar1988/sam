import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0030Component } from './ic0030.component';

describe('Ic0030Component', () => {
  let component: Ic0030Component;
  let fixture: ComponentFixture<Ic0030Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0030Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0030Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
