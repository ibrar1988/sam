import { Injectable } from '@angular/core';


@Injectable()
export class ChangeDataService {

isMilestone: boolean = false;
    constructor() { }

    isMilestonetrue(){
      return this.isMilestone = true;
    }

    isMilestonefalse(){
      return this.isMilestone = false;
    }
}