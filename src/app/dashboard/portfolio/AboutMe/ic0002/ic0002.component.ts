import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0002 } from 'core/interfaces/Portfolio/AboutMe/IC0002';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { NotificationsService } from 'angular2-notifications';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';


@Component({
  selector: 'app-ic0002',
  templateUrl: './ic0002.component.html',
  styleUrls: ['./ic0002.component.css']
})
export class IC0002Component implements OnInit, OnChanges, OnDestroy {
  completed: boolean = true;
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
 
  ngAfterViewInit(): void {
    $("#portfolio-ms-video-modal,#portfolio-sop-modal,#portfolio-my-story-modal-md,#portfolio-cross-cultural-modal-sm").appendTo("body");
  }





  container_tooltip = "Write about your vision of your future. What do you want to achieve in life or in college? Who do you desire to become? What difference are you ready to make in the world? Think big and aim high! Defining your vision will help you make the right college choices and will allow admissions officers to understand who you are and what contribution you can make to their college.";
    editEnabled: boolean = false;
    newItem: IC0002;
    errorMessage: string;
    container_name= "Statement Of Purpose";
    container_id = 'a2d545eb-e831-4154-ae6b-59719e6e152e';
    errorGet = 'Cannot Get ' + this.container_name;
    errorUpdate = 'Cannot Update' + this.container_name;
    @Input() container: IC0002;
    @Output() EventOutput: EventEmitter<IC0002> = new EventEmitter<IC0002>();
    private apiResponse: IUserPortfolioContainerResponse;
    private standardResponse: IStandardResponse;
    valuetest: number;

    constructor(private fbuilder: FormBuilder, private _service: UserPortfolioService, private _notification: NotificationsService) { }

    ngOnInit() {
      this.newItem = new IC0002();
      this.getContainer();

    }
    ngOnChanges() { //On @Input property changes
    }
    ngOnDestroy() {
      $("#portfolio-cross-cultural-modal-sm,#portfolio-ms-video-modal,#portfolio-sop-modal,#portfolio-my-story-modal-md").appendTo("body");      
    }

    updateContainer() {
      this.completed = true;
      this.container.completed = this.completed;
      this.container.date_of_creation = new Date().toDateString();
      let json = JSON.stringify(this.container); 
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0002';
      putRequest.json = json;
      putRequest.completed = this.completed;
      this._service.putPortfolioContainer(putRequest)
        .subscribe(response => {
          this.standardResponse = response;
          if (this.standardResponse.code === 'AM0000') {
            this._notification.success(this.container_name , ' Updated');
          } else {
            this._notification.error('Error',this.errorUpdate);
            this.getContainer();
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error',this.errorUpdate);
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
                
                this.newItem.date_of_creation = this.container.date_of_creation;
                this.newItem.description = this.container.description;
                this.newItem.name = this.container.name;
                this.newItem.url_profile_pic = this.container.url_profile_pic;
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
      // // this.EventOutput.emit(this.container);
    }
    addItem() {
      if (this.newItemIsValid()) {
        this.container = this.newItem;
        this.updateContainer();
        this.updateItem();
      }
    }
    newItemIsValid(): boolean{
      // if (this.newItem.name === '' || this.newItem.award === '' || this.newItem.description === '') {
      //   return false;
      // }
      return true;
    }
    enableEdition(){
      this.editEnabled = true;
    }
    disableEdition(){
      this.editEnabled = false;
    }
    updateItem(){
      this.newItem.date_of_creation = this.container.date_of_creation;
      this.newItem.description = this.container.description;
      this.newItem.name = this.container.name;
      this.newItem.url_profile_pic = this.container.url_profile_pic;
    }
  }
  const CONTAINER: IC0002 = {
    completed: true,
    date_of_creation: 'Aug 7th, 2017',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere sem ac turpis tincidunt vestibulum. Ut gravida accumsan viverra. Suspendisse a libero quis dui sollicitudin bibendum eu nec sem. Quisque ullamcorper quam nec malesuada convallis. Suspendisse potenti. In sodales libero et pellentesque imperdiet. ',
    name: 'Angel González',
    url_profile_pic: 'assets/images/home/icons8c.png'
  };
