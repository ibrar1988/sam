import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0030, CommentEntity } from 'core/interfaces/Portfolio/Personal/IC0030';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { NotificationsService } from 'angular2-notifications';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0030',
  templateUrl: './ic0030.component.html',
  styleUrls: ['./ic0030.component.css']
})
export class IC0030Component implements OnInit, OnChanges, OnDestroy {
  public value = false;
  completed: boolean;
    newItem: CommentEntity;
    errorMessage: string;
    container_name= "Given Recommendations";
    container_id = 'f9d9ebce-2034-4f68-b3e7-cacfa6b86b85';
    errorGet = 'Cannot Get ' + this.container_name;
    errorUpdate = 'Cannot Update' + this.container_name;
    container_tooltip = "Given Recommendations";
    @Input() container: IC0030;
    @Output() EventOutput: EventEmitter<IC0030> = new EventEmitter<IC0030>();
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
      this.completed = true;
      this.container.completed = this.completed;
      let json = JSON.stringify(this.container);
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0030';
      putRequest.json = json;
      this._service.putPortfolioContainer(putRequest)
        .subscribe(response => {
          console.log(response);
          this.standardResponse = response;

          if (this.standardResponse.code === 'AM0000') {
            this._notification.success(this.container_name , 'Updated');
            this.getContainer();
          } else {
            this._notification.error('Error' , this.errorUpdate);
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error' , this.errorUpdate);
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
                //   this.container.comment.push(c);
                // }
                // console.log(this.container);
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
        alert("Hi");
        console.log(c);
        this.container.comment.push(c);
      }
    }

  }
  const CONTAINER: IC0030 = {
    completed: true,
    comment: [
      { url_profile_image: 'assets/images/home/icons8c.png', name: 'Cindy Q.', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere sem ac turpis tincidunt vestibulum. Ut gravida accumsan viverra. Suspendisse a libero quis dui sollicitudin bibendum eu nec sem. Quisque ullamcorper quam nec malesuada convallis. Suspendisse potenti. In sodales libero et pellentesque imperdiet. ', 
      date_of_creation: 'Aug 7th', role: 'Mentor'},
      { url_profile_image: 'assets/images/home/icons6c.png', name: 'Rossana Y.', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere sem ac turpis tincidunt vestibulum. Ut gravida accumsan viverra. Suspendisse a libero quis dui sollicitudin bibendum eu nec sem. Quisque ullamcorper quam nec malesuada convallis. Suspendisse potenti. In sodales libero et pellentesque imperdiet. ', 
      date_of_creation: 'Aug 8th', role: 'Mentor'}//,
     ]
  };
