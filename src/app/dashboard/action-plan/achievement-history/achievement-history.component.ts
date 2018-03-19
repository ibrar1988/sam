import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Milestone } from 'core/interfaces/ActionPlan/IMilestone';
import { MilestonesGroup } from 'core/interfaces/ActionPlan/IMilestonesGroup';
import { MilestonesGroups } from 'core/interfaces/ActionPlan/IMilestonesGroups';
import { steps } from './steps';



@Component({
  selector: 'app-achievement-history',
  templateUrl: './achievement-history.component.html',
  styleUrls: ['./achievement-history.component.css']
})
export class AchievementHistoryComponent implements OnInit {

  // @ViewChild('mainScreen') elementView: ElementRef;
  elementView: ElementRef;
  viewHeight: string;


  public milestone: Milestone;
  public milestone2: Milestone;
  public milestonesGroup: MilestonesGroup;
  public milestonesGroup2: MilestonesGroup;
  public milestonesGroups: MilestonesGroups;

  public stepsArray: Array<steps> = new Array<steps>();

  public finished: number;
  public total: number;
  public percent: number;



  constructor() {

    this.milestone = new Milestone();
    this.milestone2 = new Milestone();
    this.milestonesGroup = new MilestonesGroup();
    this.milestonesGroup2 = new MilestonesGroup();
    this.milestonesGroups = new MilestonesGroups();


    this.milestone.name = 'Milestone 1';
    this.milestone.description = 'Milostone 1 description';

    this.milestone2.name = 'Milestone 2';
    this.milestone2.description = 'Milostone 2 description';

    this.milestonesGroup.name = 'Group 1';
    this.milestonesGroup.description = 'Group 1 description';

    this.milestonesGroup2.name = 'Group 2';
    this.milestonesGroup2.description = 'Group 2 description';

    this.milestonesGroup.milestone_group = new Array<Milestone>();

    this.milestonesGroup.milestone_group.push(this.milestone);
    this.milestonesGroup.milestone_group.push(this.milestone2);

    this.milestonesGroup2.milestone_group = new Array<Milestone>();

    this.milestonesGroup2.milestone_group.push(this.milestone);
    this.milestonesGroup2.milestone_group.push(this.milestone2);

    this.milestonesGroups.groups = new Array<MilestonesGroup>();

    this.milestonesGroups.groups.push(this.milestonesGroup);
    this.milestonesGroups.groups.push(this.milestonesGroup2);

    // this.viewHeight = this.elementView.nativeElement.offsetHeight+'px';
    this.viewHeight = 190 + 'px';

    console.log(this.milestonesGroups);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // this.viewHeight = this.elementView.nativeElement.offsetHeight+'px';
    this.viewHeight = 190 + 'px';
    // this.setSteps();
    this.setComplete();
  }

  onResize(event) {
    // this.viewHeight = this.elementView.nativeElement.offsetHeight + 'px';
    this.viewHeight = 190 + 'px';
  }


  setSteps() {

    let countSteps = 1;

    this.milestonesGroups.groups.forEach(element => {

      element.milestone_group.forEach(element2 => {
        if (element2.req_prev) {
          countSteps++;
        }

      });

      let step = new steps();
      step.steps = countSteps;
      this.stepsArray.push(step);
      countSteps = 1;

    });

    console.log(this.stepsArray);

  }


  setComplete() {
    this.finished = 0;
    this.total = 0;
    this.milestonesGroups.groups.forEach(element => {

      element.milestone_group.forEach(element2 => {
        if (element2.status === 'finish') {
          this.finished++;
        }
        this.total++;
      });
    });

    if (this.finished !== 0) {
      this.percent = (this.finished * 100) / this.total;
    } else {
      this.percent = 0;
    }


  }

}
