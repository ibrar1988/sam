import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaptchaModule } from 'primeng/primeng';
import { IdleComponent } from '../_tools/idle/idle.component';
import { ProfileComponent } from 'app/dashboard/profile/profile.component';
// import { PortfolioModule } from 'app/portfolio/portfolio.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRouting } from './dashboard.routing.module';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { AnalyticsModule } from './analytics/analytics.module';
import { PortfolioModule } from 'app/dashboard/portfolio/portfolio.module';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { OverlayModule } from 'angular-io-overlay';
import { DatepickerComponent } from 'app/_tools/datepicker/datepicker.component';
import { ToolsModule } from 'app/_tools/tool.module';
import { MentorsComponent } from 'app/dashboard/mentors/mentors.component';
// import { DropzoneModule } from 'ngx-dropzone-wrapper';
// import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ImageUploadModule } from 'angular2-image-upload';
import { ActionPlanComponent } from 'app/dashboard/action-plan/action-plan.component';
import { ActionPlanRouting } from 'app/dashboard/action-plan/action-plan.routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { template } from 'app/helper/global.mock';
import {ColorPickerModule} from 'primeng/primeng';
import {MdInputModule} from '@angular/material';
import {ImageCropperComponent, CropperSettings,ImageCropperModule} from 'ng2-img-cropper';



@NgModule({
  imports: [
    BootstrapSwitchModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    // DropzoneModule.forRoot(DROPZONE_CONFIG),
    BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    CommonModule,
    FormsModule,
    ColorPickerModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule, //including into imports
    Ng2OrderModule, // importing the sorting package here
    NgxPaginationModule,
    OverlayModule,
    CaptchaModule,
    AnalyticsModule,
    ImageCropperModule,
    ToolsModule,
    DashboardRouting,
    MdInputModule,
    ActionPlanRouting,
  ],
  declarations: [
    // DatepickerComponent,
    DashboardComponent,
    ProfileComponent,
    ActionPlanComponent,
    SidebarComponent,
    IdleComponent,
    MentorsComponent
  ],
  providers: [
    // ChangePasswordService, EmailConfirmationService, EmailRecoveyPasswordService,
    // LoginService, LogoutService, RefreshTokenService, TokenService,FbService
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule implements OnInit {
 public backgroundColor: string;

 constructor() {
  this.backgroundColor = template['backgroundColor'];


 }

  ngOnInit(): void {
    this.backgroundColor = template['backgroundColor'];
  }

}
