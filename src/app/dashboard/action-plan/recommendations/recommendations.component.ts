import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Directive, Input, Output, EventEmitter } from '@angular/core';
import { IUserRecommendedGoalListResponse } from 'core/interfaces/ActionPlan/Recommended-goal/IUserRecommendedGoalListResponse';
import { IUserRecommendedGoalExtended, UserRecommendedGoalExtended } from 'core/interfaces/ActionPlan/Recommended-goal/IUserRecommendedGoalExtended';
import { NotificationsService } from 'angular2-notifications';
import { UserRecommendedGoal } from 'core/interfaces/ActionPlan/Recommended-goal/IUserRecommendedGoal';
import { IMilestonesGroups, MilestonesGroups } from 'core/interfaces/ActionPlan/IMilestonesGroups';
import { RecommendedGoalService } from 'core/services/Recommended-goal/recommended-goal.service';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MilestonesGroup } from 'core/interfaces/ActionPlan/IMilestonesGroup';
import { Milestone } from 'core/interfaces/ActionPlan/IMilestone';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  providers: [RecommendedGoalService]
})
export class RecommendationsComponent implements OnInit, AfterViewInit {
  viewHeight: string = '0px';
  percent: number;
  total: number;
  finished: number;
  errorMessage: any;
  Response: IUserRecommendedGoalListResponse;
  standardResponse: IStandardResponse;
  isMilestones = false;
  currentGoal: UserRecommendedGoal;
  currentGoalName = '';
  have_goals: boolean;
  milestones_group: MilestonesGroups;
  // goals_list :Array<IUserGoalExtended>;
  goals_list: any;
  closeResult: string;
  isLoaded: boolean;
  filter: any;
  currentGoalReplicated: IUserRecommendedGoalExtended;
  milestonesGroupReplicated: MilestonesGroups;
  count:number;

  @ViewChild('post-module') el: ElementRef;
  @ViewChild('media') md: ElementRef;


  ngAfterViewInit(): void {
    $(".filter-button").click(function () {
      var value = $(this).attr('data-filter');

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
  }

  constructor(private recommendedGoalService: RecommendedGoalService,
    private _notification: NotificationsService, private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.isLoaded = false;
    window.scrollTo(0, 0);
    this.getGoals();
  }

  toOrder() {
    this.router.navigate(['/account/completeOrder']);
  }

  //sorting
  key: string = 'name';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  toRecommendedGoals() {
    this.isMilestones = false;
  }

  getGoals() {
    this.recommendedGoalService.getAllUserRecommendedGoal()
      .subscribe(response => {
        this.Response = response;
        if (this.Response.response.code === 'AM0000') {
          // this._notification.success('Success login', this.Response.response.message);
          // this.router.navigate(['/dashboard/profile']);
          this.goals_list = this.Response.user_goal_recommended_extended_list;
          console.log(this.goals_list);

          let count = 0;
          for (let user_goal_recommended of this.goals_list) {
            if (user_goal_recommended.user_goal_recommended.status == 'RECOMMENDED') {
              count++;
            }
          }

          if (count > 0) {
            this.have_goals = false;
            this.count = 1;
          }
          else{
            this.have_goals = true;
            this.count =0;
          }
        }else{

          this._notification.error('Error getting goals', this.Response.response.message);
        }

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error getting goals', this.errorMessage);
      });
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

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
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



  toMilestones(goal, premium) {

   // this.check_premium()
    if (1) {
      // alert(JSON.stringify(goal));
      let milestones = <IMilestonesGroups>JSON.parse(goal.user_goal_recommended.milestones);
      this.currentGoal = goal.user_goal_recommended;
      this.currentGoalName = goal.name;
      // alert(JSON.stringify(milestones));

      this.milestones_group = new MilestonesGroups();
      this.milestones_group = milestones;
      console.log(this.milestones_group);

      // @ViewChild('mainScreen') let elementView: ElementRef;



      this.setComplete();

      this.isMilestones = true;

    } else {

      this.open2(premium);

    }

  }


  setHeight() {
    let element = document.getElementById('mainScreen');
    let height = element.offsetHeight;
    this.viewHeight = height - 13 + 'px';
  }

  setComplete() {
    this.finished = 0;
    this.total = 0;
    this.milestones_group.groups.forEach(element => {

      element.milestone_group.forEach(element2 => {
        if (element2.status === 'COMPLETED') {
          // alert(element2.status);
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

  onResize(event) {
    let element = document.getElementById('mainScreen');
    let height = element.offsetHeight;
    this.viewHeight = height - 13 + 'px';
  }

  AcceptGoal(goal, premium) {

    if (1) {
      if (goal) {
        let milestones = <IMilestonesGroups>JSON.parse(goal.user_goal_recommended.milestones);
        this.currentGoal = goal.user_goal_recommended;
      }

      this.currentGoal.status = "ACCEPTED";
      this.currentGoal.startdate = null;
      this.recommendedGoalService.putUserRecommendedGoal(this.currentGoal).subscribe(response => {
        this.standardResponse = response;
        if (this.standardResponse.code === 'AM0000') {
          this._notification.success('Recommended Goal Accepted');
          this.isMilestones = false;
          this.getGoals();
        } else {
          console.log(this.standardResponse);
        }
      });
      return false;
    } else {

      //this.open2(premium);

    }
  }

  DeclineGoal(goal, premium) {
    //this.check_premium()
    if (1) {
      if (goal) {
        let milestones = <IMilestonesGroups>JSON.parse(goal.user_goal_recommended.milestones);
        this.currentGoal = goal.user_goal_recommended;
      }

      let milestones = <IMilestonesGroups>JSON.parse(goal.user_goal_recommended.milestones);
      this.currentGoal = goal.user_goal_recommended;

      this.currentGoal.status = "DECLINED";
      this.currentGoal.startdate = null;
      this.recommendedGoalService.putUserRecommendedGoal(this.currentGoal).subscribe(response => {
        this.standardResponse = response;
        if (this.standardResponse.code === 'AM0000') {
          this._notification.success('Recommended Goal Declined');
          this.isMilestones = false;
          this.getGoals();
        } else {
          console.log(this.standardResponse);
        }
      });
    } else {

      this.open2(premium);

    }
  }

  CloneGoal(goal, premium, goalreplicated) {
    if (this.check_premium()) {
      let milestones = <IMilestonesGroups>JSON.parse(goal.user_goal_recommended.milestones);
      this.currentGoalReplicated = goal;
      this.milestonesGroupReplicated = new MilestonesGroups();
      this.milestonesGroupReplicated = milestones;
      console.log(this.milestonesGroupReplicated.groups);

      this.open(goalreplicated);
    }
    else{
      this.open2(premium);
    }
  }

  RemoveMilestone(i,j){
    this.milestonesGroupReplicated.groups[i].milestone_group.splice(j,1);
  }

  AddMilestone(){
    let daynow = new Date();
    console.log(daynow.getMonth() + "-" + daynow.getDay() + "-" + daynow.getFullYear());

    let milestone: Milestone = {
      description: "",
      img_url: "",
      name: "",
      status: "started",
      completed_date: "",
      ref_code: "",
      req_prev: "false",
      started_date: (daynow.getMonth()+1) + "-" + String("00" + daynow.getDay()).slice(-2) + "-" + daynow.getFullYear()
    }

    this.milestonesGroupReplicated.groups[0].milestone_group.push(milestone);
  }

  stopLoading() {
    this.isLoaded = true;
  }

  AddMyPlan(): boolean{
    if(this.milestonesGroupReplicated.groups[0].milestone_group.length == 0){
      this._notification.error("Warning", "You don't have milestones, please enter at least one of them");
      return false;
    }

    for(let milestone of this.milestonesGroupReplicated.groups[0].milestone_group){
      if(milestone.name == '' || milestone.description == ''){
        this._notification.error("Warning", "You have a empty milestone, all fields are required!");
        return false;
      }
    }

    this.milestonesGroupReplicated.groups[0].qty = this.milestonesGroupReplicated.groups[0].milestone_group.length.toString();
    this.currentGoalReplicated.user_goal_recommended.startdate = null;
    this.currentGoalReplicated.user_goal_recommended.milestones = JSON.stringify(this.milestonesGroupReplicated);
    this.currentGoalReplicated.user_goal_recommended.milestones_qty = this.milestonesGroupReplicated.groups[0].milestone_group.length;

    let goalReplicated: any;
    goalReplicated = {
      user_goal_recommended_extended: this.currentGoalReplicated
    };

    this.recommendedGoalService.cloneGoalRecommended(goalReplicated).subscribe(response => {
      this.standardResponse = response;
      if (this.standardResponse.code === 'AM0000') {
        this._notification.success("Success", "Goal replicated successfully");
        //this.getGoals();
      } else {
        this._notification.error("Error", this.standardResponse.message);
      }
    });

    return true;
  }

  // public goals = [
  //   {
  //     'id': '1',
  //     'name': 'Improve your overall GPA',
  //     'group': 'Academic',
  //     'description': "Your overall GPA is good but not yet competitive. All college admissions officers want to see candidates' GPAs and it is one of the very top decision criteria for them."
  //   },
  //   {
  //     'id': '2',
  //     'name': 'Improve your English SAT subject test score',
  //     'group': 'Academic',
  //     'description': "You took an English SAT subject test quite early but did not yet achieve the results that college admissions expect. "
  //   },
  //   {
  //     'id': '3',
  //     'name': 'Improve your writing skills',
  //     'group': 'Academic',
  //     'description': 'You consider your writing skills good though not outstanding. Writing skills reveal how well you communicate with others and organize your thoughts.'
  //   },
  //   {
  //     'id': '4',
  //     'name': 'Improve your test taking skills',
  //     'group': 'Academic',
  //     'description': 'You achieved high academic and overall GPAs. Well done! Your standardized test scores lagged behing your school performance.'
  //   },
  //   {
  //     'id': '5',
  //     'name': 'Look for cross-cultural exposure opportunities',
  //     'group': 'PERSONAL',
  //     'description': 'Cross-cultural exposure is a great sign of maturity and open mindedness. In our global world more and more colleges look for it. '
  //   },
  //   {
  //     'id': '6',
  //     'name': 'Engage in extracurricular activities',
  //     'group': 'PERSONAL',
  //     'description': 'Extracurricular activities are a great way to demonstrate your interests and passions, show convincing evidence of your personal qualities and make you stand out in a crowd of college applicants.'
  //   },
  //   {
  //     'id': '7',
  //     'name': 'Find a leadership position in your volunteering activity',
  //     'group': 'PERSONAL',
  //     'description': 'Colleges look for students who demonstrated community engagement and are not indifferent to the problems of the world. Volunteering, charitable activity and many other ways of "giving back" are great to show those qualities of character.'
  //   }, {
  //     'id': '8',
  //     'name': 'Start learning about colleges and college life',
  //     'group': 'PROFESSIONAL',
  //     'description': 'Transition from high school to college can be exciting and challenging at the same time because school expectations and your lifestyle change so much. Use opportunities that come your way to get a feel for what your college life will be like.'
  //   }, {
  //     'id': '9',
  //     'name': 'Consider college savings plan',
  //     'group': 'PROFESSIONAL',
  //     'description': "Paying for college is one of the biggest worries that students and their families have. Planning ahead can definitely help and reduce the financial challenge."
  //   }, {
  //     'id': '10',
  //     'name': 'Consider gaining some work-related experience in summer',
  //     'group': 'PROFESSIONAL',
  //     'description': 'Work experience is not a college application requirement. But it can be useful for you. Firstly, if you find a job or an internship related to a career that you are comtemplating, you can better understand that profession and validate if it is right for you. '
  //   }
  // ];
}
