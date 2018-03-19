import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0028 } from 'core/interfaces/Portfolio/Personal/IC0028';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { NotificationsService } from 'angular2-notifications';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-ic0028',
  templateUrl: './ic0028.component.html',
  styleUrls: ['./ic0028.component.css']
})
export class IC0028Component implements OnInit, OnChanges, OnDestroy {
  title_modal:string;
  index:number;
  closeResult: string;
  show_alert= false;
  public value = false;
  completed: boolean;
    newItem: IC0028;
    errorMessage: string;
    container_name= "Personal Qualities";
    container_id = 'aa44f81a-e0f1-440c-b45c-d1d047af0f71';
    errorGet = 'Cannot Get ' + this.container_name;
    errorUpdate = 'Cannot Update' + this.container_name;
    container_tooltip = "Character is very important for college admission officers. It shows how likely a candidate is to succeed in college and if they will fit a specific college culture. For each of the 12 qualities below, evaluate to what extent you believe it describes you as a person on a scale of 1 to 10, so that we can help you craft your personal college candidate pitch. Be honest with yourself. There are very few Superhumans among us.";
    @Input() container: IC0028;
    @Output() EventOutput: EventEmitter<IC0028> = new EventEmitter<IC0028>();
    private apiResponse: IUserPortfolioContainerResponse;
    private standardResponse: IStandardResponse;
    valuetest: number;

    constructor(private modalService: NgbModal,private fbuilder: FormBuilder, private _service: UserPortfolioService, private _notification: NotificationsService) { }

    ngOnInit() {
      this.newItem = new IC0028();
      this.getContainer();
      //this.updateContainer();
    }
    ngOnChanges() { //On @Input property changes
    }
    ngOnDestroy() {
    }

    updateContainer() {
      if(this.container.open_mindedness=='10' && this.container.enthusiasm=='10'
       && this.container.strong_communication_skills=='10'&& this.container.intellectual_curiosity=='10'
       && this.container.collaboration=='10' && this.container.critical_thinking=='10'
       && this.container.leadership=='10' && this.container.perseverance=='10'
       && this.container.empathy_caring=='10' && this.container.problem_solving=='10'
       && this.container.humility=='10'&& this.container.strong_work_ethic=='10'){
        this.completed = true;
      }else{
        this.completed = false;
      }
      this.container.completed = this.completed;
      let json = JSON.stringify(this.container);
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0028';
      putRequest.json = json;
      putRequest.completed = this.completed;
      this._service.putPortfolioContainer(putRequest)
        .subscribe(response => {
          console.log(response);
          this.standardResponse = response;

          if (this.standardResponse.code === 'AM0000') {
            this._notification.success(this.container_name , 'Updated');
          } else {
            this._notification.error('Error' , this.errorUpdate);
            this.getContainer();
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error' , this.errorUpdate);
          console.log(this.errorMessage);
          this.getContainer();
        });
      // this.EventOutput.emit(this.container);
    }

    getContainer() {
      //this.container = CONTAINER;
      this._service.getPortfolioContainer(this.container_id)
        .subscribe(response => {
          this.apiResponse = response;

          if (this.apiResponse.response.code === 'AM0000') {
            if (this.apiResponse.container) {
              try {
                this.container = JSON.parse(this.apiResponse.container.json);
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            this._notification.error('Error' , this.errorGet);
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error' , this.errorGet);
          console.log(this.errorMessage);
        });
      // // this.EventOutput.emit(this.container);
    }
    removeItem(index: number) {
      document.getElementById('hobbies-' + index).classList.add('removed-item');
      setTimeout(() => {
        //this.container.splice( index, 1);
        this.updateContainer();
      }, 600);
    }
    addItem(): boolean{
      if (this.newItemIsValid()) {
        if(this.index<0){
          //this.container.hobbies_interests.push(this.newItem);
        }
        else{
          //this.container.hobbies_interests[this.index]= this.newItem;
        }
        this.updateContainer();
        //this.newItem = new HobbiesInterestsEntity();
        return true;
      }
      return false;
    }
    newItemIsValid(): boolean{
        // if (this.newItem.name === '' || this.newItem.name === undefined) {
        //   this.errorMessage = 'Field Category Name is Required';
        //   this.show_alert = true;
        //   return false;
        //   }
        // if(this.newItem.award === '' || this.newItem.award === undefined){
        //   this.errorMessage = 'Field Award is Required';
        //   this.show_alert = true;
        //   return false;
        //   }
        // if(this.newItem.description === '' || this.newItem.description === undefined){
        //   this.errorMessage = 'Field From is Required';
        //   this.show_alert = true;
        //   return false;
        // }
        this.errorMessage = '';
        this.show_alert = false;
      return true;
    }
    open(isnew, position,content){
      this.show_alert = false;  
      if(isnew){
        this.title_modal = "Add";
        this.index = -1;
      }else{
        this.title_modal = "Edit";
        this.index = position;
      }
  
      if(position >= 0){
        //let item = this.container.hobbies_interests[position];
        //this.newItem = item;
      }
      
      this.modalService.open(content).result.then((result) => {
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
        return  `with: ${reason}`;
      }
    }
    // onChangeRange(value, value2, id, desc) {
    //   const result = this.searchTags.filter(item => item.id === id)[0];
    //   if (value2 > 0 && value === 0) {
    //     if (id === 13) {
    //         value2 = value2 / 100;
    //     }
    //     result.value = '[0 TO ' + value2 + ']' ;
    //     result.name = desc + ': ' + value2;
    //     result.active = true;
    //   } else {
    //     if (value2 > 0 && value > 0) {
    //       result.value = '[' + value + ' TO ' + value2 + ']' ;
    //       result.name = desc + ': ' + value + ' - ' + value2;
    //       result.active = true;
    //     } else {
    //       result.active = false;
    //     }
    //   }
    //   this.search();
    // }
  }
  const QUALITIES = [
    'Open Mindedness',
    'Enthusiasm',
    'Strong Communication Skills',
    'Intellectual Curiosity',
    'Collaboration',
    'Critical Thinking',
    'Leadership',
    'Perseverance',
    'Empathy Caring',
    'Humility',
    'Strong Work Ethic',
  ];
  const CONTAINER: IC0028 = {
    completed: true,
    open_mindedness: '5',
    enthusiasm: '5',
    strong_communication_skills: '5',
    intellectual_curiosity: '5',
    collaboration: '5',
    critical_thinking: '5',
    leadership: '5',
    perseverance: '5',
    empathy_caring: '5',
    problem_solving: '5',
    humility: '5',
    strong_work_ethic: '5'
  };
