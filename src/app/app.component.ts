
import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginService } from '../core/services/Account/login.service';
import { global } from './helper/global.mock';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { MonitoringService } from 'insights/AppInsightsModule';
import { template } from 'app/helper/global.mock';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, LoginService, NotificationsService, MonitoringService],

})

export class AppComponent implements OnInit, OnChanges {

  public location: Location;
  public _isSidebar: boolean;
  public _isBreadcrumb: boolean;
  public actualMargin: string;
  public loading = false;
  public compatibility = true;

  errorMessage: any;
  currentBackground: string;
  public options = {
      position: ['bottom', 'right'],
      timeOut: 5000,
      lastOnBottom: true,
  };



  login: ILoginResponse;

  isDefault = false;
  isBackground1 = false;
  isBackground2 = false;
  isBackground3 = false;
  isBackground4 = false;
  isBackground5 = false;
  isBackground6 = false;
  isBackground7 = false;
  isBackground8 = false;
  isBackground9 = false;

  ngOnChanges(): void {
    this.setBackground(this.getBackground());

  }

  constructor(location: Location, private loginService: LoginService,
    private _notification: NotificationsService, private router: Router,
    private monitoringService: MonitoringService
  ) {

    this.location = location;

  }


  ngOnInit() {

    
    this.currentBackground = '' + template['pageBackground'] + '';
    this.setBackground(this.currentBackground);

    // Se valida el explorer que se está usando
    const objAgent = navigator.userAgent;
    const msie = objAgent.indexOf("MSIE");
    const trident = objAgent.indexOf('Trident/');

    if (msie > 0 || trident > 0) {
      // this.compatibility = false;
      // this.router.navigate(['/compatibility']);
    }
  }

  ngAfterContentInit() {
    this.setBackground(this.getBackground());
  }

  postLoginService() {
    this.loading = true;
    this.loginService.login('alatorre@pacificsoft.net', 'new2004021')
      .subscribe(login => {
        this.login = login;
        this._notification.success('Success login', JSON.stringify(this.login));
        this.loading = false;
      },
      error => {
      this.errorMessage = <any>error;
        this._notification.error('Error login', this.errorMessage);
        this.loading = false;
      });
  }

  getBackground() {
    return template['pageBackground'];
  }

  initBackground() {
    this.isDefault = false;
    this.isBackground1 = false;
    this.isBackground2 = false;
    this.isBackground3 = false;
    this.isBackground4 = false;
    this.isBackground5 = false;
    this.isBackground6 = false;
    this.isBackground7 = false;
    this.isBackground8 = false;
    this.isBackground9 = false;
  }

  setBackground(background) {
    this.initBackground();
    switch (background) {
      case 'bg-default':
        this.isDefault = true;
        break;
      case 'custom-bg-1':
        this.isBackground1 = true;
        break;
      case 'custom-bg-2':
        this.isBackground2 = true;
        break;
      case 'custom-bg-3':
        this.isBackground3 = true;
        break;
      case 'custom-bg-4':
        this.isBackground4 = true;
        break;
      case 'custom-bg-5':
        this.isBackground5 = true;
        break;
      case 'custom-bg-6':
        this.isBackground6 = true;
        break;
      case 'custom-bg-7':
        this.isBackground7 = true;
        break;
      case 'custom-bg-8':
        this.isBackground8 = true;
        break;
      case 'custom-bg-9':
        this.isBackground9 = true;
        break;
      default:
        break;
    }

  }

}

