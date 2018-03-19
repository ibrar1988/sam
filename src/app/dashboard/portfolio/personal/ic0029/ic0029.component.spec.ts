import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0029Component } from './ic0029.component';

describe('Ic0029Component', () => {
  let component: Ic0029Component;
  let fixture: ComponentFixture<Ic0029Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0029Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0029Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
