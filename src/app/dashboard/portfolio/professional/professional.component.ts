import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from 'core/services/Account/login.service';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {
  errorMessage: string;
  public type = '';
  constructor(private router: Router, private loginService: LoginService, private _notification: NotificationsService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
