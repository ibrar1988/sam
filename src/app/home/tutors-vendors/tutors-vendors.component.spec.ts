import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeohroComponent } from './peohro.component';

describe('PeohroComponent', () => {
  let component: PeohroComponent;
  let fixture: ComponentFixture<PeohroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeohroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeohroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
