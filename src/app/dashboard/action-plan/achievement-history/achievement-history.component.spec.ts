import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementHistoryComponent } from './achievement-history.component';

describe('AchievementHistoryComponent', () => {
  let component: AchievementHistoryComponent;
  let fixture: ComponentFixture<AchievementHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
