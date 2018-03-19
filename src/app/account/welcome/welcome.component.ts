import { Component, OnInit } from '@angular/core';
import {WelcomeTutorialService} from '../../../core/services/Account/confirmWelcomeTurorial.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {ILoginResponse} from '../../../core/interfaces/Account/ILoginResponse';

import { TagAdderService } from 'core/services/helper/tagAdder.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [WelcomeTutorialService, NotificationsService, TagAdderService]
})
export class WelcomeComponent implements OnInit {
  currentStep = 1;
  grade = '';
  response: ILoginResponse;

  constructor(
    private welcomeTutorialService: WelcomeTutorialService,
    private _notification: NotificationsService, private tagAdderService: TagAdderService
  ) {}

  ngOnInit() {
     //addded newly for script tag.
     this.tagAdderService.addTag( 'fbq("track", "CompleteRegistration")');
  }

  onSetStatus() {
   

    this.welcomeTutorialService.confirmWelcomeTutorial(this.grade)
      .subscribe(response => {
          this.response = response;
          if (this.response.response.code === 'AM0000') {
            this.currentStep = 3;
          } else {
            this._notification.error('Error setting Grade', 'Please try again.');
          }
        },
        error => {
          this._notification.error('Error setting Grade', 'Please try again.');
        });
  }

}
