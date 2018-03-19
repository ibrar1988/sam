import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0028Component } from './ic0028.component';

describe('Ic0028Component', () => {
  let component: Ic0028Component;
  let fixture: ComponentFixture<Ic0028Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0028Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0028Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
