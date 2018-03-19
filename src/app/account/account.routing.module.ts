import { NgModule } from '@angular/core';
import { EmailRecoveryPasswordComponent } from './email-recovery-password/email-recovery-password.component';
import { LoginComponent } from './login/login.component';
import { ActivateComponent } from './activate/activate.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailComponent } from './signup/email/email.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
// import { SiteComponent } from '../site-template/site/site.component';
import { AccountComponent } from 'app/account/account.component';
import { HomeComponent } from 'app/home/home.component';
import {ProfileComponent} from '../dashboard/profile/profile.component';
import { RoleComponent } from 'app/account/signup/role/role.component';
import { IC0000Component } from 'app/dashboard/portfolio/AboutMe/ic0000/ic0000.component';
import { CompleteOrderComponent } from 'app/account/stripe/complete-order/complete-order.component';
import { AuthGuard, CheckSession } from 'app/_tools/auth';
import { ChangeEmailComponent } from 'app/account/change-email/change-email.component';
import { PlansComponent } from 'app/account/plans/plans.component';
import { WelcomeComponent} from 'app/account/welcome/welcome.component';

const accountRoutes: Routes = [
  {
  //   path: '', component: SiteComponent, children: [
  //     {
  //   path: 'account', component: AccountComponent,
  //   children: [
  //     { path: 'login', component: LoginComponent },
  //     { path: 'emailRecoverPassword', component: EmailRecoveryPasswordComponent },
  //     { path: 'changePassword', component: ChangePasswordComponent },
  //     { path: 'login/activate/:token', component: ActivateComponent },
  //     { path: 'recoveryPassword/:token', component: RecoveryPasswordComponent },
  //     { path: 'signup/role', component: RoleComponent },
  //     { path: 'signup/role/:role', component: SignupComponent },
  //     { path: 'register/role/:role', component: EmailComponent },
  //     { path: 'profile', component: ProfileComponent },
  //     { path: 'ic0000', component: IC0000Component }
  //
  //
  //   ]
  // }
    path: 'account', component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [CheckSession] },
      { path: 'emailRecoverPassword', component: EmailRecoveryPasswordComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: 'login/activate/:token', component: ActivateComponent },
      { path: 'recoveryPassword/:token', component: RecoveryPasswordComponent },
      { path: 'changeEmail/:token', component: ChangeEmailComponent },
      { path: 'signup/role', component: RoleComponent, canActivate: [CheckSession]},
      { path: 'signup/role/:role', component: SignupComponent, canActivate: [CheckSession] },
      { path: 'register/role/:role', component: EmailComponent, canActivate: [CheckSession] },
      { path: 'activate/:token', component: ActivateComponent },
      { path: 'activate', component: ActivateComponent },
      { path: 'plans', component: PlansComponent },
      { path: 'completeOrder', component: CompleteOrderComponent, canActivate: [AuthGuard]},
      { path: 'ic0000', component: IC0000Component },
      { path: 'welcome', component: WelcomeComponent}
  ,
  { path: '', component: HomeComponent }
  ]
  }
];



@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes),

  ],
  exports: [
    RouterModule,

  ]
  // ,
  // declarations: [
  //   // SiteComponent,AccountComponent,LoginComponent,EmailRecoveryPasswordComponent,ChangePasswordComponent,ActivateComponent,
  //   // RecoveryPasswordComponent,SignupComponent,EmailComponent
  // ]
})

export class AccountRouting {

}


