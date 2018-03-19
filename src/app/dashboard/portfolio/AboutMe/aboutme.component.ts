import { Component, OnInit } from '@angular/core';
import { LoginService } from 'core/services/Account/login.service';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {
  errorMessage: string;
  public type = '';
  constructor(
    private loginService: LoginService, private _notification: NotificationsService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
