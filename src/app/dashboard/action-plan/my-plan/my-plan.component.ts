import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { IUserGoal, UserGoal } from 'core/interfaces/ActionPlan/IUserGoal';
import { IMilestonesGroups, MilestonesGroups } from 'core/interfaces/ActionPlan/IMilestonesGroups';
import { ActionPlanService } from 'core/services/ActionPlan/actionPlan.service';
import { NotificationsService } from 'angular2-notifications';
import { IUserGoalListResponse } from 'core/interfaces/ActionPlan/IUserGoalListResponse';
import { Router } from '@angular/router';
import { IUserGoalExtended, UserGoalExtended } from 'core/interfaces/ActionPlan/IUserGoalExtended';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { Meta } from '@angular/platform-browser';
import { UserGoalMilestonePut } from 'core/interfaces/ActionPlan/IUserGoalMilestonePut';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Milestone } from 'core/interfaces/ActionPlan/IMilestone';
import { IUserGoalCustom, UserGoalCustom } from 'core/interfaces/ActionPlan/IUserGoalCustom';




@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.css'],
 
})


export class MyPlanComponent implements OnInit {
   

  UserGoalMilestonePut: UserGoalMilestonePut;
  goal: IUserGoal;
  require_confirmation: boolean;
  id: string;
  hideEdit:boolean=false;

  viewHeight: string = '0px';
  percent: number;
  total: number;
  finished: number;
  errorMessage: any;
  Response: IUserGoalListResponse;
  StandarResponse: IStandardResponse;
  show_alert: boolean;
  
  newName = '';
  newDescription = '';


  newGoalName = '';
  newGoalDescription = '';

  filter: any;


  isNewMilestone = false;
  isNewGoal = false;

  isMilestones = false;
  closeResult: string;
  isLoaded: boolean;
  newMilestone = {};
  createFlag: boolean;
 

  milestones_group: MilestonesGroups;
  // goals_list :Array<IUserGoalExtended>;
  goals_list: Array<IUserGoalExtended>;

  @ViewChild('post-module') el: ElementRef;
  @ViewChild('media') md: ElementRef;
  

  ngAfterViewInit(): void {
    $(".filter-button").click(function () {
      var value = $(this).attr('data-filter');

      $('.filter-button').css({'background-color':'#fff','color':'#120b2f'});
      $(this).css({'background-color':'#120b2f', 'color':'#fff'});
      if (value == "all") {
        $('.filter').show('1000');
      }
      else {
        $(".filter").not('.' + value).hide('3000');
        $('.filter').filter('.' + value).show('3000');
      }
    });

    if ($(".filter-button").removeClass("active")) {
      $(this).removeClass("active");
    }

    $(this).addClass("active");

    // $('.post-module').hover(function () {
    //   $(this).find('.description').stop().animate({
    //     height: 'toggle',
    //     opacity: 'toggle'
    //   }, 300);
    // });


    // $('#media').val().carousel({
    //   pause: true,
    //   interval: false,
    // });


  }

  constructor(private actionPlanService: ActionPlanService,
    private _notification: NotificationsService,
    private _router: Router,
    private metaService: Meta,
    private modalService: NgbModal,
    

  ) {
    
    // this.newMilestone.name = '';
    // this.newMilestone.description = '';

  }

  ngOnInit() {
    this.isLoaded = false;
    window.scrollTo(0, 0);
    this.getGoals();
    // this.newMilestone.name = '';
    // this.newMilestone.description = '';

  }
  
  //sorting
  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  toGoals() {
    this.isMilestones = false;
  }
  
  closeGoal(event)
  {
    console.log('DATA FROM GOAL BOX : '+event);
  }

  getIsEdit(value) {

    if (value == 'true') {
      return 'false';
    }
    if (value == 'false') {
      return 'true';
    }
  }

  getDateJSON(sdate) {

    let d = new Date(sdate);
    let n = d.toJSON();
    return n;

  }

  getGoals() {

    this.actionPlanService.getAllUserGoal()
      .subscribe(response => {
        this.Response = response;
        if (this.Response.response) {
          if (this.Response.response.code === 'AM0000') {
            // this._notification.success('Success login', this.Response.response.message);
            // this.router.navigate(['/dashboard/profile']);
            this.goals_list = <Array<IUserGoalExtended>>this.Response.user_goal_extended_list;
            
            //console.log("FOR MILESTONE DEGGING : "+JSON.stringify(this.goals_list));
            for(let goal of this.goals_list){
              let completed_milestone_qty: number = 0;
              let milestones = <IMilestonesGroups>JSON.parse(goal.user_goals.milestones);
              
              for(let milestone of milestones.groups[0].milestone_group){
                if(milestone.status == "completed"){
                  completed_milestone_qty++;
                }
              }

              goal.user_goals.completed_milestones_qty = completed_milestone_qty;
              //alert(JSON.stringify(goal.user_goals.completed_milestones_qty));
               if(goal.user_goals.completed_milestones_qty == goal.user_goals.milestones_qty){
                goal.user_goals.status = "COMPLETED";
              }else{
                goal.user_goals.status = "INCOMPLETED";
              }
            }

            this.isLoaded = true;
          } else {
            this._notification.error('Error getting goals', this.Response.response.message);
          }
        }

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error getting goals', this.errorMessage);
      });
  }
  

  updateMilestone(milestone, position) {

    // console.log(this.milestones);
    this.UserGoalMilestonePut = new UserGoalMilestonePut();
    this.UserGoalMilestonePut.milestone = JSON.stringify(milestone);
    this.UserGoalMilestonePut.gkey= this.goal.gkey;
    this.UserGoalMilestonePut.position = position;
    // this.milestones.startdate = this.getDateJSON(this.milestones.startdate);
    // this.milestones.last_update_date = this.getDateJSON(this.milestones.last_update_date);
    //last_update_date


    this.actionPlanService.putUserMilestone(this.UserGoalMilestonePut)
      .subscribe(response => {
        this.StandarResponse = response;
        if (this.Response.response.code === 'AM0000') {
          this._notification.success('Milestone Updated', this.StandarResponse.message);
          this.getGoals();
          this.setComplete();
          // this.router.navigate(['/dashboard/profile']);


        } else {

          this._notification.error('Error updating milestone', this.Response.response.message);
        }

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error updating milestone', this.errorMessage);
      });

  }

   formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
		 var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    // add a zero in front of numbers<10
    m = this.checkTime(m);
    s = this.checkTime(s);
    return [year, month, day].join('-')+' '+h+':'+m+':'+s+'+0000';
}
 checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}


  updateGoal(goal: IUserGoal) {
   //alert(JSON.stringify(goal));
  // alert(goal.startdate);
    
    this.actionPlanService.putUserGoal(goal)
      .subscribe(response => {
        this.StandarResponse = response;
        if (this.Response.response.code === 'AM0000') {
          this._notification.success('Goal Updated', this.StandarResponse.message);
          this.setComplete();
          // this.router.navigate(['/dashboard/profile']);
        } else {

          this._notification.error('Error updating goal', this.Response.response.message);
        }

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error updating goal', this.errorMessage);
      });

  }

  deleteUserGoal(goalId: string) {

    this.actionPlanService.deleteUserGoal(goalId)
      .subscribe(response => {
        this.StandarResponse = response;
        if (this.Response.response.code === 'AM0000') {
          this._notification.success('Goal Updated', this.StandarResponse.message);
          this.setComplete();
          // this.router.navigate(['/dashboard/profile']);


        } else {

          this._notification.error('Error updating goal', this.Response.response.message);
        }

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error updating goal', this.errorMessage);
      });

  }

  addNewMilestone() {
    console.log('New Milestone');
    this.isNewMilestone = !this.isNewMilestone;
  }

  deleteMilestone(position, positionRoot) {

    if (this.milestones_group.groups[positionRoot].milestone_group) {
      if (this.milestones_group.groups[positionRoot].milestone_group.length > 1) {
        this.milestones_group.groups[positionRoot].milestone_group.splice(position, 1);

      } else {
        this._notification.error('Can\'t delete milestone', 'At least there must be a milestone in your goal!');
        return;
      }

    }


    this.goal.milestones = JSON.stringify(this.milestones_group);
    this.goal.startdate = new Date(this.goal.startdate);
    this.goal.milestones_qty = this.milestones_group.groups[positionRoot].milestone_group.length;

    this.actionPlanService.putUserGoal(this.goal)
      .subscribe(response => {
        this.StandarResponse = response;
        if (this.Response.response.code === 'AM0000') {
          this._notification.success('Goal Updated', this.StandarResponse.message);


          this.newName = '';
          this.newDescription = '';
          this.isNewMilestone = !this.isNewMilestone;
          this.getGoals();
          this.setComplete();
          // this.router.navigate(['/dashboard/profile']);


        } else {

          this._notification.error('Error updating goal', this.Response.response.message);
        }

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error updating goal', this.errorMessage);
      });

  }

  deleteGoal(positionRoot) {

    if (this.goals_list[positionRoot]) {
      //[0].user_goals
      this.deleteUserGoal(this.goals_list[positionRoot].gkey);
      this.goals_list.splice(positionRoot, 1);

    } else {
      this._notification.error('Can\'t delete milestone', 'At least there must be a milestone in your goal!');
      return;
    }

  
  }

  createMilestone(positionRoot) {

    if (this.newDescription != '' && this.newDescription != '') {
      let newMilestone = new Milestone;

      newMilestone.description = this.newDescription;
      newMilestone.name = this.newName;
      newMilestone.img_url = '';
      newMilestone.started_date = new Date().toString();
      newMilestone.status = 'started';

      this.milestones_group.groups[positionRoot].milestone_group.push(newMilestone);
      this.goal.milestones = JSON.stringify(this.milestones_group);
      this.goal.startdate = new Date(this.goal.startdate);
      this.goal.milestones_qty = this.milestones_group.groups[positionRoot].milestone_group.length;

      this.actionPlanService.putUserGoal(this.goal)
        .subscribe(response => {
          this.StandarResponse = response;
          if (this.Response.response.code === 'AM0000') {
            this._notification.success('Goal Updated', this.StandarResponse.message);
            this.getGoals();

            this.newName = '';
            this.newDescription = '';
            this.isNewMilestone = !this.isNewMilestone;
            this.setComplete();
            // this.router.navigate(['/dashboard/profile']);


          } else {

            this._notification.error('Error updating goal', this.Response.response.message);
          }

        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error updating goal', this.errorMessage);
        });


    } else {
      this._notification.error('Fields empty', 'Complete your fields');

    }


  }

  // refreshGoal()
  // {
  //   alert("Hii");
  //   this.getGoals();
  // }

  // createNewGoal(){
  //   this.createFlag =  this.createGoal();
  //   if(this.createFlag){
  //     this.getGoals();
  //   }
  // }

  createGoal(): boolean {
    this.show_alert = false;
    
    if(this.newGoalName == ""){
      this.errorMessage = "Field Goald Name required!";
      this.show_alert = true;
      return false;
    }

    if(this.newGoalDescription == ""){
      this.errorMessage = "Field Goald Description required!";
      this.show_alert = true;
      return false;
    }

    let customGoal = new UserGoalCustom();
    customGoal.name = this.newGoalName;
    customGoal.description = this.newGoalDescription;
  

    this.actionPlanService.createNewGoal(customGoal)
      .subscribe(response => {
        this.StandarResponse = response;
        if (this.Response.response.code === 'AM0000') {

          this._notification.success('Goal Updated', this.StandarResponse.message)
          this.getGoals();
          this.newGoalName = '';
          this.newGoalDescription = '';
          this.isNewGoal = !this.isNewGoal;
          
         
          
          // this.router.navigate(['/dashboard/profile']);

        } else {

          this._notification.error('Error updating goal', this.Response.response.message);
        }

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error updating goal', this.errorMessage);
      });
     // this.getGoals();
      //alert(this.getGoals());
     // setTimeout(()=>{ this.getGoals(); alert(this.getGoals())}, 4000) 
    return true;
  }


  public check_premium() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.premium_status == 'ACTIVE') {
      return true;
    } else {
      return false;
    }

  }

  open2(content) {
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  toOrder() {
    this._router.navigate(['/account/completeOrder']);

  }

  toMilestones(goal: IUserGoal, premium) {

     if (this.check_premium()) {
     
    this.goal = goal;
    // alert(JSON.stringify(goal));
    let milestones = <IMilestonesGroups>JSON.parse(goal.milestones);
    this.id = goal.gkey;

    this.require_confirmation = goal.require_confirmation;

    // alert(JSON.stringify(milestones));

    this.milestones_group = new MilestonesGroups();
    this.milestones_group = milestones;


    // @ViewChild('mainScreen') let elementView: ElementRef;



    this.setComplete();

    this.isMilestones = true;
    window.scrollTo(0, 0);




    } else {

      this.open2(premium);
    }

  }

  setStatus(status) {

    if (status === 'started') {
      return 'completed';
    }
    if (status === 'completed') {
      return 'started';
    }


  }



  setHeight() {

    let element = document.getElementById('mainScreen');
    if (element) {
      let height = element.offsetHeight;
      this.viewHeight = height - 13 + 'px';
    }

  }

  setComplete() {
    this.finished = 0;
    this.total = 0;
    console.log(this.milestones_group);
    if (this.milestones_group) {
      this.milestones_group.groups.forEach(element => {

        element.milestone_group.forEach(element2 => {

          if (element2.status == 'COMPLETED' || element2.status == 'completed') {
            this.finished++;
          }
          this.total++;
        });
      });

      if (this.finished !== 0) {
        this.percent = Number(((this.finished * 100) / this.total).toFixed(0));
      } else {
        this.percent = 0;
      }
    }



  }

  stopLoading() {
    this.isLoaded = true;
  }

  onResize(event) {
    let element = document.getElementById('mainScreen');
    let height = element.offsetHeight;
    this.viewHeight = height - 13 + 'px';
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
