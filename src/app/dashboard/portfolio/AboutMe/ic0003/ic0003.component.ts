import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0003, CommentEntity } from 'core/interfaces/Portfolio/AboutMe/IC0003';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { NotificationsService } from 'angular2-notifications';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0003',
  templateUrl: './ic0003.component.html',
  styleUrls: ['./ic0003.component.css']
})
export class IC0003Component implements OnInit, OnChanges, OnDestroy {
  completed:boolean;
  public value = false;
  public onText = 'Public';
  public offText = 'Private';
  public onColor = 'yellow';
  public offColor = 'yellow';
  public size = 'normal';
  public disabled = false;
  
  switch: boolean;

  onFlagChange(event) {
    if (!this.value) {
    }
  }
  container_tooltip = "Given Recommendations.";
    newItem: CommentEntity;
    errorMessage: string;
    container_name= "Given Recommendations";
    container_id = '1cc8f4a8-483e-42d3-9705-f7dfad8a21fa';
    errorGet = 'Cannot Get ' + this.container_name;
    errorUpdate = 'Cannot Update ' + this.container_name;
    @Input() container: IC0003;
    @Output() EventOutput: EventEmitter<IC0003> = new EventEmitter<IC0003>();
    private apiResponse: IUserPortfolioContainerResponse;
    private standardResponse: IStandardResponse;
    valuetest: number;

    constructor(private fbuilder: FormBuilder, private _service: UserPortfolioService, private _notification: NotificationsService) { }

    ngOnInit() {
      this.newItem = new CommentEntity();
      this.getContainer();
    }
    ngOnChanges() { //On @Input property changes
    }
    ngOnDestroy() {
    }

    updateContainer() {
      this.completed = false;
      this.container.completed = this.completed;
      var reg = /"/g;
      let json = JSON.stringify(this.container);//.replace(reg, '\\\\\\\"');
      console.log(json);
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0003';
      putRequest.json = json;
      putRequest.completed = this.completed;
      this._service.putPortfolioContainer(putRequest)
        .subscribe(response => {
          console.log(response);
          this.standardResponse = response;

          if (this.standardResponse.code === 'AM0000') {
            this._notification.success(this.container_name, 'Updated');
          } else {
            this._notification.error('Error', this.errorUpdate);
            this.getContainer();
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error', this.errorUpdate);
          console.log(this.errorMessage);
        });
      // this.EventOutput.emit(this.container);
    }

    getContainer() {
      //this.container = CONTAINER;
      this._service.getPortfolioContainer(this.container_id)
        .subscribe(response => {
          this.apiResponse = response;

          if (this.apiResponse.response.code === 'AM0000') {
            //this._notification.success('Container Updated', 'Container Updated');
            if (this.apiResponse.container) {
              try {
                this.container = JSON.parse(this.apiResponse.container.json);
                for(var i=0; this.container.comment.length ; i++){
                  if(this.container.comment[i].name == ""){
                    this.container.comment.splice(i,1);
                  }
                }
                // for (let c of CONTAINER.comment) {
                //   console.log(c);
                //   this.container.comment.push(c);
                // }
                // console.log(this.container);
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            this._notification.error('Error', this.errorGet);
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error', this.errorGet);
          console.log(this.errorMessage);
        });
        //this.fillComments();
      // // this.EventOutput.emit(this.container);
    }
    removeItem(index: number) {
      document.getElementById('hobbies-' + index).classList.add('removed-item');
      setTimeout(() => {
        this.container.comment.splice( index, 1);
        console.log(this.container);
      }, 600);
    }
    addItem() {
      if (this.newItemIsValid()) {
        this.newItem.url_profile_image = 'assets/images/home/icons6c.png';
        this.container.comment.push(this.newItem);
        this.newItem = new CommentEntity();
      }
    }
    newItemIsValid(): boolean{
      // if (this.newItem.name === '' || this.newItem.award === '' || this.newItem.description === '') {
      //   return false;
      // }
      return true;
    }

    fillComments(){
      for (let c of CONTAINER.comment) {
        console.log(c);
        this.container.comment.push(c);
      }
    }
  }
  const CONTAINER: IC0003 = {
    completed: true,
    comment: [
      { url_profile_image: 'assets/images/home/icons7c.png', name: 'Cindy Q.', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere sem ac turpis tincidunt vestibulum. Ut gravida accumsan viverra. Suspendisse a libero quis dui sollicitudin bibendum eu nec sem. Quisque ullamcorper quam nec malesuada convallis. Suspendisse potenti. In sodales libero et pellentesque imperdiet. ', 
      date_of_creation: 'Aug 7th', role: 'Mentor'},
      { url_profile_image: 'assets/images/home/icons7c.png', name: 'Rossana Y.', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere sem ac turpis tincidunt vestibulum. Ut gravida accumsan viverra. Suspendisse a libero quis dui sollicitudin bibendum eu nec sem. Quisque ullamcorper quam nec malesuada convallis. Suspendisse potenti. In sodales libero et pellentesque imperdiet. ', 
      date_of_creation: 'Aug 8th', role: 'Mentor'}//,
     ]
  };
