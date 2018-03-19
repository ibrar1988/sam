import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRouting } from './account.routing.module';
import { CaptchaModule } from 'primeng/primeng';
import { EmailRecoveryPasswordComponent } from './email-recovery-password/email-recovery-password.component';
import { LoginComponent } from './login/login.component';
import { ActivateComponent } from './activate/activate.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { EmailComponent } from './signup/email/email.component';
import { SignupComponent } from './signup/signup.component';
import { IdleComponent } from '../_tools/idle/idle.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { AccountComponent } from 'app/account/account.component';
import { ProfileComponent } from 'app/dashboard/profile/profile.component';
import { RoleComponent } from 'app/account/signup/role/role.component';
import { PortfolioModule } from 'app/dashboard/portfolio/portfolio.module';
import { FacebookModule } from 'ngx-facebook';
import { CompleteOrderComponent } from './stripe/complete-order/complete-order.component';
import { DatepickerComponent } from 'app/_tools/datepicker/datepicker.component';
import { ToolsModule } from 'app/_tools/tool.module';
import { PlansComponent } from './plans/plans.component';
import {WelcomeComponent} from 'app/account/welcome/welcome.component';
import { NotificationsService } from 'angular2-notifications';
import { MdProgressSpinnerModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CaptchaModule,
    AccountRouting,
    PortfolioModule,
    FacebookModule.forRoot(),
    ToolsModule,
    MdProgressSpinnerModule
  ],
  declarations: [
    // DatepickerComponent,
    EmailRecoveryPasswordComponent,
    RoleComponent,
   // LoginComponent,
    ActivateComponent,
    RecoveryPasswordComponent,
    // IdleComponent,
    SignupComponent,
    AccountComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    LoginComponent,
    // ProfileComponent,
    EmailComponent,
    CompleteOrderComponent,
    // PlansComponent,
    WelcomeComponent

  ],
  providers: [
    DatepickerComponent,
    NotificationsService
    // ChangePasswordService, EmailConfirmationService, EmailRecoveyPasswordService,
    // LoginService, LogoutService, RefreshTokenService, TokenService,FbService
  ],
  bootstrap: [AccountComponent]
})
export class AccountModule { }

