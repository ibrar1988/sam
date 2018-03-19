import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { ChangePasswordTokenService } from 'core/services/Account/changePasswordToken.service';
import { Meta } from '@angular/platform-browser';
import { IUserResponse } from 'core/interfaces/Account/IUserResponse';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css'],
  providers: [ChangePasswordTokenService, NotificationsService]
})
export class RecoveryPasswordComponent implements OnInit {

  // model: any = {};
  // returnUrl: string;
  email = '';
  private sub: any;
  response: IUserResponse;
  errorMessage: string;
  returnUrl: string;
  verification_token: string;
  password: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changePasswordTokenService: ChangePasswordTokenService,
    private _notification: NotificationsService,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => { this.verification_token = params['token']; });
  
  }

  recoverPassword(validation) {

    if (validation) {
      this.changePasswordTokenService.changePasswordToken(this.verification_token, this.password)
        .subscribe(response => {
          this.response = response;
          if (this.response.response.code === 'AM0000') {
            this._notification.success('Password changed', this.response.response.message);
          } else {
            this._notification.error('Error changing password', this.response.response.message);
          }
          //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate(['/account/login']);
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error changing password', this.errorMessage);
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        });

    } else {

      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }



  }



}
