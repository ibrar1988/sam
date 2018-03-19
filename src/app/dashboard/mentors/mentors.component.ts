import { Component, OnInit } from '@angular/core';
import { MentorsService } from 'core/services/Mentors/mentors.service';
import { IMentorsListResponse } from 'core/interfaces/Mentors/IMentorsListResponse';

@Component({
    selector: 'mentors',
    templateUrl: './mentors.component.html',
    providers:[MentorsService]
})

export class MentorsComponent {
    mentorsListResponse: IMentorsListResponse;
    errorMessage: any;

    public mentors_list: any;

    constructor(
        private mentorsService: MentorsService
    ) {

    }



    ngOnInit() {
        window.scrollTo(0, 0);
        this.getMentors();
    }


    getMentors() {
        this.mentorsService.getMentors()
          .subscribe(Response => {
            this.mentorsListResponse = Response;
            if (this.mentorsListResponse.response.code === 'AM0000') {
              this.mentors_list = this.mentorsListResponse.orders;
            }
          },
          error => {
            this.errorMessage = <any>error;
          });
      }
}
