import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0002Component } from './ic0002.component';

describe('Ic0002Component', () => {
  let component: Ic0002Component;
  let fixture: ComponentFixture<Ic0002Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0002Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
