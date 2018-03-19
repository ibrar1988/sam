import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0021 } from 'core/interfaces/Portfolio/Academic/IC0021';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0021',
  templateUrl: './ic0021.component.html',
  styleUrls: ['./ic0021.component.css']
})
export class IC0021Component implements OnInit, OnChanges, OnDestroy {
  public value = false;
  container_tooltip = "Tell us how you evaluate your writing skills. They reveal how well you communicate and organize your thoughts. You will need good writing skills to prepare strong application essays.";
  container_name= "Writing Skills";
  errorGet = 'Error Getting ' + this.container_name;
  errorUpdate = 'Error Updating ' + this.container_name;

  errorMessage: string;
  container_id = '22ebba21-dcdf-45eb-840a-75edf1461cb9';
  @Input() container: IC0021;
  @Output() EventOutput: EventEmitter<IC0021> = new EventEmitter<IC0021>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  is_completed: boolean;
  valuetest: number;

  //Variables de entidad
  rate: string;

  constructor(private _service: UserPortfolioService, private _notification: NotificationsService) { 
  }

  ngOnInit() {
    this.getContainer();
  }
  ngOnChanges() { //On @Input property changes
  }
  ngOnDestroy() {
  }

  rateChange(rate){
    if(!isNaN(rate)){
      this.rate = rate;
    }
  }

  updateContainer() {
    this.is_completed = true;
    var reg = /"/g;
    this.container.rate = this.rate;
    let json = JSON.stringify(this.container);
    let putRequest = new UserPortfolioContainerPutRequest();
    putRequest.container_id = this.container_id;
    putRequest.container_code = 'IC0021';
    putRequest.completed = this.is_completed;
    putRequest.json = json;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        this.standardResponse = response;
        if (this.standardResponse.code === 'AM0000') {
          this._notification.success(this.container_name + ' Updated', '');
        } else {
          this._notification.error(this.errorUpdate, '');
          this.getContainer();
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error(this.errorUpdate, '');
      });
  }
  assign() {
    //this.valuetest = this.container.comment.length;
  }
  
  getContainer() {
    this._service.getPortfolioContainer(this.container_id)
      .subscribe(response => {
        this.apiResponse = response;

        if (this.apiResponse.response.code === 'AM0000') {
          if (this.apiResponse.container) {
            try {
              this.container = <IC0021>JSON.parse(this.apiResponse.container.json);
              if(this.container.rate == '' || this.container.rate == undefined){
                this.container.rate = "0";
              }

              this.rate = this.container.rate;

            } catch (error) {
              console.log(error);
            }
          }
        } else {
          this._notification.error(this.errorGet, '');
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error(this.errorGet, '');
      });
  }

  handleRate(event) {
      this.rate = event.value;
      this.updateContainer();
  }

  handleCancel(event){
    this.rate = "0";
    this.updateContainer();
  }
}
