import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0000 } from 'core/interfaces/Portfolio/AboutMe/IC0000';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { NotificationsService } from 'angular2-notifications';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0000',
  templateUrl: './ic0000.component.html',
  styleUrls: ['./ic0000.component.css']
})
export class IC0000Component implements OnInit, OnChanges, OnDestroy {
    completed: boolean;
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
    container_tooltip = "General information is required for the account set-up. We will use it to protect your account privacy and to make sure that the myKlovr service is best suited to your profile.";
    newItem: IC0000;
    errorMessage: string;
    container_name= "General Information";
    container_id = '145099da-1459-46a2-8eab-bc59a1032ae5';
    @Input() container: IC0000;
    @Output() EventOutput: EventEmitter<IC0000> = new EventEmitter<IC0000>();
    private apiResponse: IUserPortfolioContainerResponse;
    private standardResponse: IStandardResponse;
    valuetest: number;

    constructor(private fbuilder: FormBuilder, private _service: UserPortfolioService, private _notification: NotificationsService) { }

    ngOnInit() {
      this.newItem = new IC0000();
      this.getContainer();
    }
    ngOnChanges() { //On @Input property changes
    }
    ngOnDestroy() {
    }

    updateContainer() {
      var reg = /"/g;
      this.completed = false;
      this.container.completed = this.completed;
      let json = JSON.stringify(this.container);
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0000';
      putRequest.completed = this.completed;
      putRequest.json = json;
      this._service.putPortfolioContainer(putRequest)
        .subscribe(response => {
          console.log(response);
          this.standardResponse = response;

          if (this.standardResponse.code === 'AM0000') {
            this._notification.success(this.container_name + ' Container Updated', '');
          } else {
            this._notification.error('Error Updating '+ this.container_name + ' Container', 'Container not updated');
            this.getContainer();
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error Updating Container', this.errorMessage);
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
                console.log(this.container);
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            this._notification.error('Error Getting ' + this.container_name + 'Container', 'Cannot Retrieve the Container');
          }
        },
        error => {
          this.errorMessage = <any>error;
          this._notification.error('Error Gettiing ' + this.container_name + 'Container', this.errorMessage);
        });
      // // this.EventOutput.emit(this.container);
    }
    
    addItem() {
      if (this.newItemIsValid()) {
        this.container = this.newItem;
        this.newItem = new IC0000();
      }
    }
    newItemIsValid(): boolean{
      // if (this.newItem.name === '' || this.newItem.award === '' || this.newItem.description === '') {
      //   return false;
      // }
      return true;
    }
  }
  const CONTAINER: IC0000 = {
    completed: true,
    city: 'Los Angeles',
    country: 'UNITED ESTATES',
    date_of_birth: 'Aug the 7th, 1992',
    email: 'agonzalez@pacificsoft.net',
    state: 'California',
    url_facebook: 'angel@facebook.com',
    url_instagram: 'angel@intagram.com',
    url_linkedin: 'angel@linkedin.com',
    url_twitter: 'angel@twitter.com'
  };
