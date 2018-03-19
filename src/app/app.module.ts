import { NgModule, OnInit, OnDestroy } from '@angular/core';

import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CaptchaModule } from 'primeng/primeng';
import { CoreModule } from '../core/core.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoadingModule } from 'ngx-loading';
import { AppRouting } from 'app/app.routing.module';
import { AccountRouting } from 'app/account/account.routing.module';
import { AnalyticsRouting } from './dashboard/analytics/analytics.routing.module';
import { DashboardRouting } from './dashboard/dashboard.routing.module';

import { AccountModule } from './account/account.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';

import { NavigationComponent } from './shared/navigation/navigation.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './shared/right-sidebar/rightsidebar.component';
import { IdleComponent } from 'app/_tools/idle/idle.component';
import { DatepickerComponent } from './_tools/datepicker/datepicker.component';
import { ToolsModule } from 'app/_tools/tool.module';
import { ActionPlanModule } from 'app/dashboard/action-plan/action-plan.module';
import { GestureConfig, MaterialModule } from '@angular/material';
import { ActionPlanRouting } from 'app/dashboard/action-plan/action-plan.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlansComponent } from 'app/account/plans/plans.component';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { PeohroComponent } from './home/peohro/peohro.component';
import { WelcomeComponent } from './account/welcome/welcome.component';
import {BaseComponent} from '../insights/AppInsightsBase';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValidateToken } from './_tools/interceptor/validateToken';




const config: SocketIoConfig = { url: '35.190.168.61:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
    PeohroComponent,
    BaseComponent
  
  ],
  imports: [
    // PlansComponent,
    BrowserModule.withServerTransition({appId: 'myklovr'}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SocketIoModule.forRoot(config),
    ToolsModule,
    CaptchaModule,
    HttpModule,
    HttpClientModule,
    LoadingModule,
    SimpleNotificationsModule,
    CoreModule,
    ActionPlanModule,
    HomeModule,
    ActionPlanRouting,
    AccountModule,
    DashboardModule,


    AccountRouting,
    DashboardRouting,
    AnalyticsRouting,
    AppRouting
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ValidateToken, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})

export class AppModule implements OnInit, OnDestroy {
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
  router: any;
  routerSubscription: any;

  ngOnInit() {

    // this.routerSubscription = this.router.events
    //   .filter(event => event instanceof NavigationEvent)
    //   .subscribe(event => {
    //     window.scrollTo(0, 0);
    //   });

  }

}
