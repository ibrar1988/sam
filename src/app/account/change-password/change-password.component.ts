import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangePasswordService } from 'core/services/Account/changePassword.service';
import { IUserResponse } from 'core/interfaces/Account/IUserResponse';
import { NotificationsService } from 'angular2-notifications';
import { Meta } from '@angular/platform-browser';

@Component({
  // selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public actualPassword: string;
  public newPassword: string;
  public rnewPassword: string;

  response: IUserResponse;
  errorMessage: string;

  constructor(
    private changePasswordService: ChangePasswordService,
    private _notification: NotificationsService,
    private metaService: Meta) { 
      this.metaService.addTag({property: 'title', content: 'Change Password'});
      this.metaService.addTag({property: 'description', content: 'Change Password Page of Myklovr'});

    }

  ngOnInit() {



  }


  changePassword(validation) {

    if (validation && (this.newPassword === this.rnewPassword)) {

      this.changePasswordService.changePassword(this.actualPassword, this.newPassword)
        .subscribe(response => {
          this.response = response;
          if (this.response.response.code === 'AM0000') {
            this._notification.success('Password changed', this.response.response.message);
          } else {
            this._notification.error('Error changing password', this.response.response.message);
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error changing password', this.errorMessage);
        });
    } else {
      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }
  }

}

