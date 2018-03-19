import { Component, Renderer, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IC0024 } from 'core/interfaces/Portfolio/Personal/IC0024';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { NotificationsService } from 'angular2-notifications';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0024',
  templateUrl: './ic0024.component.html',
  styleUrls: ['./ic0024.component.css']
})
export class IC0024Component implements OnInit, OnChanges, OnDestroy {
  public value = false;
    completed: boolean;
    newItem: string = '';
    errorMessage: string;
    container_name= "Cross-Cultural Experience";
    container_id = '6eca30a6-3f3c-4a44-855c-2697008c54d1';
    errorGet = 'Cannot Get ' + this.container_name;
    errorUpdate = 'Cannot Update' + this.container_name;
    container_tooltip = "A planned and evaluated learning experience that places the student in an environment where learning is accomplished through active interaction with a different culture, either within the U.S. or abroad.";
    @Input() container: IC0024;
    @Output() EventOutput: EventEmitter<IC0024> = new EventEmitter<IC0024>();
    private apiResponse: IUserPortfolioContainerResponse;
    private standardResponse: IStandardResponse;
    valuetest: number;

    constructor(private fbuilder: FormBuilder, private _service: UserPortfolioService, private _notification: NotificationsService) { }

    ngOnInit() {
      this.getContainer();
      //this.updateContainer();
    }

    ngAfterViewInit(): void {

    }


    ngOnChanges() { //On @Input property changes
    }
    ngOnDestroy() {
      $("#portfolio-cross-cultural-modal-sm").remove();
    }

    popUpModal()
    {
      $("#portfolio-cross-cultural-modal-sm").appendTo("body");
    }
    updateContainer() {
      this.completed = true;
      this.container.completed = this.completed;
      let json = JSON.stringify(this.container);
      let putRequest = new UserPortfolioContainerPutRequest();
      putRequest.completed = this.completed;
      putRequest.container_id = this.container_id;
      putRequest.container_code = 'IC0024';
      putRequest.json = json;
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
            //this._notification.success('Container Updated', 'Container Updated');
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
      document.getElementById('cross-cultural-tag-' + index).classList.add('removed-item');
      setTimeout(() => {
        this.container.cross_cultural.splice( index, 1);
        this.updateContainer();
      }, 600);
    }
    addItem() {
      if (this.newItemIsValid()) {
        this.container.cross_cultural.push(this.newItem);
        this.updateContainer();
        this.newItem = '';
      }
    }
    newItemIsValid(): boolean{
      if (this.newItem === '') {
          return false;
        }
      return true;
    }
  }
  const CONTAINER: IC0024 = {
    completed: true,
    cross_cultural: [
        'Research', 'Travel', 'Volunteering Experience'
    ]
  };
