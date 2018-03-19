import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0026Component } from './ic0026.component';

describe('Ic0026Component', () => {
  let component: Ic0026Component;
  let fixture: ComponentFixture<Ic0026Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0026Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0026Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
