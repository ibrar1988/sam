import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Account
import { ChangePasswordService } from './services/Account/changePassword.service';
import { CitiesService } from './services/Account/cities.service';
import { CountriesService } from './services/Account/countries.service';
import { ChangeConfirmationStatusService } from 'core/services/Account/changeConfirmationStatus.service';
import { EmailChangeEmailService } from 'core/services/Account/emailChangeEmail.service';
import { EmailRecoveryPasswordService } from './services/Account/emailRecoveryPassword.service';
import { EmailResendConfirmationService } from 'core/services/Account/emailResendConfirmation.service';
import { LoginExternalService } from './services/Account/loginExternal.service';
import { LoginService } from '../core/services/Account/login.service';
import { LogoutService } from './services/Account/logout.service';
import { ChangePasswordTokenService } from './services/Account/changePasswordToken.service';
import { RefresTokenService } from '../core/services/Account/refrestoken.service';
import { StatesService } from './services/Account/states.service';
import { AccountService } from './services/Account/account.service';
import { ApiService } from 'core/services/Account/api.service';
import { FbService } from 'core/services/Account/fbLogin.service';
import { FacebookService } from 'ngx-facebook/dist/esm';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BillingInfoService } from 'core/services/Account/billingInfo.service';
import { ChangeEmailService } from 'core/services/Account/changeEmail.service';
// Portfolio
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { GenerateUserPortfolioService } from 'core/services/Portofolio/generateUserPortfolio.service';
// Store
import { CompleteOrderStripeService } from './services/Store/completeOrderStripe.service';
import { NewOrderService } from 'core/services/Store/newOrder.service';
import { OrdersService } from 'core/services/Store/orders.service';
// Analytics
import { CollegeFilterService } from 'core/services/Analytics/collegeFilter.service';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';
import { AuthGuard,PremiumGuard } from 'app/_tools/auth';
import { DatepickerComponent } from 'app/_tools/datepicker/datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionPlanService } from 'core/services/ActionPlan/actionPlan.service';
import {CheckSession} from "../app/_tools/auth/auth.guard";

@NgModule({
    imports: [
        CommonModule,
        BootstrapSwitchModule.forRoot(),
        SimpleNotificationsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule
    ],
    declarations: [ ],
    providers: [
        AccountService,
        BillingInfoService,
        ChangeEmailService,
        ChangePasswordService,
        ChangePasswordTokenService,
        CitiesService,
        CountriesService,
        ChangeConfirmationStatusService,
        EmailChangeEmailService,
        EmailRecoveryPasswordService,
        EmailResendConfirmationService,
        LoginExternalService,
        LoginService,
        LogoutService,
        RefresTokenService,
        StatesService,
        ApiService,
        FbService,
        FacebookService,
        UserPortfolioService,
        GenerateUserPortfolioService,
        CompleteOrderStripeService,
        NewOrderService,
        OrdersService,
        CollegeFilterService,
        AuthGuard,
        PremiumGuard,
        CheckSession,
        ActionPlanService


    ],
})
export class CoreModule { }
