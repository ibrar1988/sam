import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ChangeEmailService } from 'core/services/Account/changeEmail.service';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css'],
  providers: [ChangeEmailService, NotificationsService]
})
export class ChangeEmailComponent implements OnInit {

  email = '';
  private sub: any;
  response: ILoginResponse;
  errorMessage: string;
  returnUrl: string;
  verification_token: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changeEmailService: ChangeEmailService,
    private _notification: NotificationsService,
    private metaService: Meta
  ) {
    this.metaService.addTag({property: 'title', content: 'Change Email Page'});
    this.metaService.addTag({property: 'description', content: 'Change Email Page of Myklovr'});

   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => { this.verification_token = params['token']; });
    this.changeEmail();

  }

  changeEmail() {
  
      this.changeEmailService.changeEmail(this.verification_token)
        .subscribe(response => {
          this.response = response;

          if (this.response.response.code === 'AM0000') {
            this._notification.success('Change Email confirmation send', this.response.response.message);
            this.router.navigate(['/account/login']);
          } else {
            this._notification.error('Error Changing Email', this.response.response.message);
          }
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error Changing Email', this.errorMessage);
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        });

  }



}
