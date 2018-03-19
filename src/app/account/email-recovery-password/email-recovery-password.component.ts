import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailRecoveryPasswordService } from 'core/services/Account/emailRecoveryPassword.service';
import { IUserResponse } from 'core/interfaces/Account/IUserResponse';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { NotificationsService } from 'angular2-notifications';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-email-recovery-password',
  templateUrl: './email-recovery-password.component.html',
  styleUrls: ['./email-recovery-password.component.css']
})
export class EmailRecoveryPasswordComponent implements OnInit {

  model: any = {};
  returnUrl: string;
  token: string;
  password: string;
  public sub: any;
  response: IUserResponse;
  errorMessage: string;
  email: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private emailRecoveryPasswordService: EmailRecoveryPasswordService,
    private _notification: NotificationsService,
    private metaService: Meta
  ) {

    this.metaService.addTag({property: 'title', content: 'Email Recovery Password Page'});
    this.metaService.addTag({property: 'description', content: 'Email Recovery Password Page of Myklovr'});
   }

  ngOnInit() {
   
  }

  changePassword(validation) {
    if(validation){
      this.emailRecoveryPasswordService.emailRecoveryPassword(this.email)
      .subscribe(response => {
        this.response = response;

        if (this.response.response.code === 'AM0000') {
          this._notification.success('Recover password email sent', this.response.response.message);
        } else {
          this._notification.error('Error sending email', this.response.response.message);
        }


      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error sending email', this.errorMessage);
      });
    }else{
      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }

  }

  // tokenConfirmation(){

   
  //   this.changeConfirmationStatusService.changeConfirmationStatus(this.token)
  //       .subscribe(response => {
  //         this.response = response;
  
  //         if (this.response.response.code === 'AM0000') {
  //           this._notification.success('Valid Token', this.response.response.message);
  //         } else {
  //           this._notification.error('Invalid Token', this.response.response.message);
  //         }
  
  
  //       },
  //       error => {
  //         this.errorMessage = <any>error;
  //         this._notification.error('Invalid Token', this.errorMessage);
  
  
  //       });
  //}






}
