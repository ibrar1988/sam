import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ic0024Component } from './ic0024.component';

describe('Ic0024Component', () => {
  let component: Ic0024Component;
  let fixture: ComponentFixture<Ic0024Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ic0024Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ic0024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
