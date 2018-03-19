import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IC0000Component } from './ic0000.component';

describe('IC0000Component', () => {
  let component: IC0000Component;
  let fixture: ComponentFixture<IC0000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IC0000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IC0000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
