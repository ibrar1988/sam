import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaptchaModule } from 'primeng/primeng';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRouting } from './analytics.routing.module';
import { FinderComponent } from './finder/finder.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {MdSliderModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdRadioModule} from '@angular/material';
import {SliderModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    CaptchaModule,
    AnalyticsRouting,
    MultiselectDropdownModule,
    MdSliderModule,
    MdInputModule,
    MdRadioModule

  ],
  declarations: [
    AnalyticsComponent,
    FinderComponent,
  ],
  providers: [
    /*
     ChangePasswordService, EmailConfirmationService, EmailRecoveyPasswordService,
     LoginService, LogoutService, RefreshTokenService, TokenService,FbService
     */
  ],
  bootstrap: [AnalyticsComponent]
})
export class AnalyticsModule { }

