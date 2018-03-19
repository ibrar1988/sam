import { Component, OnInit } from '@angular/core';
// import { LoginService } from '../../../_services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'core/services/Account/login.service';
import { FbService } from 'core/services/Account/fbLogin.service';
import { IdleComponent } from 'app/_tools/idle/idle.component';
import { ILogin } from 'core/interfaces/Account/ILogin';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { RemembermeService } from 'core/services/Account/rememberme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, FbService, RemembermeService]
})
export class LoginComponent implements OnInit {

  public email: string;
  public _email: string;
  public password: string;
  public fbToken: string;
  public fbUserId: string;
  public fbStatus: string;

  public rememberme: Boolean;

  public loginResponse: ILoginResponse;
  errorMessage: string;


  public type = '';
  constructor(
    private loginService: LoginService, private fbService: FbService,
    private _notification: NotificationsService,
    private _rememberme: RemembermeService,
    private router: Router,
    private metaService: Meta) {

    this.metaService.addTag({ property: 'title', content: 'Login Page' });
    this.metaService.addTag({ property: 'description', content: 'Login Page of Myklovr' });

    this.router.events.subscribe(() => {
      window.scroll(0, 0);
    });
  }

  loginWithFacebook(): void {
    this.fbService.loginWithFacebook(null);

  }

  getLoginStatus() {
    this.fbService.getLoginStatus();
  }

  ngOnInit() {

    if (localStorage.getItem('rememberme')) {
      this.email = JSON.parse(localStorage.getItem('rememberme')).email;
      // this.password = 'password';
      this.rememberme = true;
    }


  }

  login(validation) {

    if (validation) {


      this.loginService.login(this.email, this.password)
        .subscribe(login => {
          this.loginResponse = login;
          if (this.loginResponse.response.code === 'AM0000') {
            if (this.rememberme) {
              localStorage.setItem('rememberme', JSON.stringify({ email: this.email }));
            } else {
              localStorage.removeItem('rememberme');
            }

            if (this.loginResponse.login.grade === undefined ||
              this.loginResponse.login.trainning_status === undefined) {


              this._notification.success('Success login ', this.loginResponse.response.message);

              this.router.navigate(['/account/welcome']);

            } else {

              if (this.rememberme) {
               localStorage.setItem('rememberme', JSON.stringify({ email: this.email }));
              } else {
                localStorage.removeItem('rememberme');
              }

              this.router.navigate(['/dashboard/profile']);

              this._notification.success('Success login ', this.loginResponse.response.message);
            }
          } else {
            if (this.loginResponse.response.code === 'AM0007') {
              this.router.navigate(['/account/activate']);
            } else {
              this._notification.error('Error login', this.loginResponse.response.message);
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error login', this.errorMessage);
        });
    } else {
      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }
  }


}
