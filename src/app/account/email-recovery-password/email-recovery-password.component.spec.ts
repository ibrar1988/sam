import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRecoveryPasswordComponent } from './email-recovery-password.component';

describe('EmailRecoveryPasswordComponent', () => {
  let component: EmailRecoveryPasswordComponent;
  let fixture: ComponentFixture<EmailRecoveryPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRecoveryPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
