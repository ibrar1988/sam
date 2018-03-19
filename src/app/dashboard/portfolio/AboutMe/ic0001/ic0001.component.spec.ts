import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IC0001Component } from './ic0001.component';

describe('IC0001Component', () => {
  let component: IC0001Component;
  let fixture: ComponentFixture<IC0001Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IC0001Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IC0001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
