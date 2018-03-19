import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeConfirmationStatusService } from 'core/services/Account/changeConfirmationStatus.service';
import { IUserResponse } from 'core/interfaces/Account/IUserResponse';
import { NotificationsService } from 'angular2-notifications';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { EmailResendConfirmationService } from 'core/services/Account/emailResendConfirmation.service';
import { Meta } from '@angular/platform-browser';

import { TagAdderService } from 'core/services/helper/tagAdder.service';


@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
  providers: [TagAdderService]
})
export class ActivateComponent implements OnInit {

  model: any = {};
  returnUrl: string;
  token: string;
  sub: any;
  message: any;
  email = '';

  emailConfirmation = false;
  emailconfirmation_ok = false;
  //
  with_session = false;
  show_email = false;

  loginResponse: ILoginResponse;
  userResponse: IUserResponse;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeConfirmationStatusService: ChangeConfirmationStatusService,
    private _notification: NotificationsService,
    private emailResendConfirmation: EmailResendConfirmationService,
    private metaService: Meta,
    private tagAdderService: TagAdderService
  ) {

    this.metaService.addTag({property: 'title', content: 'Activate Page'});
    this.metaService.addTag({property: 'description', content: 'Activate Page of Myklovr'});
    this.router.events.subscribe(() => {
      window.scroll(0, 0);
    });
  }

  ngOnInit() {

    // addded newly for script tag.
    this.tagAdderService.addTag("fbq('track', 'Lead')");

    this.sub = this.route.params.subscribe(params => { this.token = params['token']; });

    if (this.token) {
      // token activation
      this.emailConfirmation = true;

      // this.with_session = true;
      // this.show_email = true;
      this.changeConfirmationStatus();
    } else {
      if (localStorage.getItem('currentUser')) {
        //after login
        this.with_session = true;
        if (!JSON.parse(localStorage.getItem('currentUser')).email_validated) {
          this.email = localStorage.getItem('temp_email');
          this.show_email = true;
        } else {
          //error
          //send to home
          this.toHome();

        }
      } else {
        this.with_session = true;
        this.emailConfirmation = false;
        this.show_email = true;
        //error
        //send to home
      //  this.toHome();


      }

    }







    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  toProfile() {

    this.router.navigate(['/dashboard/profile']);
  }

  toLogin() {

    this.router.navigate(['/account/login']);
  }

  toHome() {

    this.router.navigate(['/']);
  }

  changeConfirmationStatus() {

    this.changeConfirmationStatusService.changeConfirmationStatus(this.token)
      .subscribe(response => {
        this.loginResponse = response;
        if (this.loginResponse.response.code === 'AM0000') {
          this.emailconfirmation_ok = true;
          this._notification.success('Success activate', this.loginResponse.response.message);
          localStorage.setItem('currentUser', JSON.stringify(this.loginResponse.login));
          this.router.navigate(['/account/welcome']);
        } else {
          this.emailconfirmation_ok = false;
          this._notification.error('Error activate', this.loginResponse.response.message);
        }
      },
      error => {
        this.emailconfirmation_ok = false;
        this.errorMessage = <any>error;
        this._notification.error('Error activate', this.errorMessage);
      });
  }


  resend() {

    this.emailResendConfirmation.emailResendConfirmation(this.email)
      .subscribe(response => {
        this.userResponse = response;
        if (this.userResponse.response.code === 'AM0000') {

          this._notification.success('Activation Email', 'Email sent to your account');


        } else {

          this._notification.error('Activation Email', 'Error sending Email');
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Activation Email', this.errorMessage);
      });


  }

}
