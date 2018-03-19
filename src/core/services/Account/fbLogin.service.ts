import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, InitParams } from 'ngx-facebook';
// import { TokenService } from './token.service';
import { LoginExternalService } from './loginExternal.service';
import { environment } from '../../../environments/environment';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { ILogin } from 'core/interfaces/Account/ILogin';

@Injectable()

export class FbService {
  loginResponse: ILoginResponse;

  private email: string;
  private password: string;
  private fbToken: string;
  private fbUserId: string;
  private fbStatus: string;

  errorMessage: string;

  constructor(private fb_init: FacebookService,
    private tokenService: LoginExternalService,
    private router: Router,

  ) {
    const initParams: InitParams = {
      appId: '156802384772432',
      //appId: '1943001829257076',
      // xfbml: true,
      version: 'v2.7'
      //version: 'v2.10'
    };
    /*
 fb.init({
      appId: '1927971220769787',
      version: 'v2.9'
    });*/
    fb_init.init(initParams);
  }

  loginWithFacebook(role): void {
    const options: LoginOptions = {
      scope: 'email',
      return_scopes: true,
      enable_profile_selector: true
    };


    this.fb_init.login(options)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
        //   alert('Logged in \n' + JSON.stringify(res));
        this.fbToken = res.authResponse.accessToken;
        this.fbUserId = res.authResponse.userID;
        this.fbStatus = res.status;

        this.tokenService.getLoginExternal(this.fbToken)
          .subscribe(login => {
            this.loginResponse = login;
            if (this.loginResponse.response.code === 'AM0000') {

              // if (role === null) {
              let currentUser = <ILogin>this.loginResponse.login;
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              localStorage.removeItem('fb_session');
              if (this.loginResponse.login.grade === undefined || this.loginResponse.login.trainning_status === undefined) {
                this.router.navigate(['/account/welcome']);
              } else {
                this.router.navigate(['/dashboard/profile']);
              }
              // } else {
              //    this.router.navigate(['/account/register/role/' + role]);
              // }



              console.log(this.loginResponse);
            } else {

            }
            if (this.loginResponse.response.code === 'AM0002') {
              let currentUser = <ILogin>this.loginResponse.login;
              localStorage.setItem('temp_email', currentUser.username);
              this.router.navigate(['/account/signup/role']);
              // this.router.navigate(['/account/register/role/' + role]);

            }

          },
          error => {
            this.errorMessage = <any>error;
            // this._notification.error('Error login', this.errorMessage);
          });





      })
      .catch(this.handleError);
  }

  getLoginStatus() {
    this.fb_init.getLoginStatus()
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
  }

  private handleError(error) {
    console.error('Error processing action', error);
  }


}
