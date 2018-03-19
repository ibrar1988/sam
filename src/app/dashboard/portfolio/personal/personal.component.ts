import { Component, OnInit } from '@angular/core';
import { LoginService } from 'core/services/Account/login.service';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  errorMessage: string;
  public type = '';
  constructor(
    private loginService: LoginService, private _notification: NotificationsService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
