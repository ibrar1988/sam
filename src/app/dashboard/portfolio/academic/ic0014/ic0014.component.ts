import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0014 } from 'core/interfaces/Portfolio/Academic/IC0014';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0014',
  templateUrl: './ic0014.component.html',
  styleUrls: ['./ic0014.component.css']
})
export class IC0014Component implements OnInit, OnChanges, OnDestroy {

  errorMessage: string;
  container_id = '3eca43b6-c745-4c0a-b8e7-d330d813c111';
  container_name = 'Pre ACT';
  errorGet = 'Cannot Get ' + this.container_name;
  errorUpdate = 'Cannot Update ' + this.container_name;
  @Input() container: IC0014;
  @Output() EventOutput: EventEmitter<IC0014> = new EventEmitter<IC0014>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  show_alert: boolean;
  index: number;
  is_completed: boolean;

  //Variables de entidad
  total: string;
  english: string;
  math: string;
  reading: string;
  science: string;
  essay: string;

  constructor(private _service: UserPortfolioService, private _notification: NotificationsService, 
    private modalService: NgbModal) { 
  }

  ngOnInit() {
    this.getContainer();
  }
  ngOnChanges() { //On @Input property changes
  }
  ngOnDestroy() {
  }

  updateContainer() {
    this.is_completed = true;
    var reg = /"/g;
    let json = JSON.stringify(this.container);
    console.log(json);
    let putRequest = new UserPortfolioContainerPutRequest();
    putRequest.container_id = this.container_id;
    putRequest.container_code = 'IC0014';
    putRequest.json = json;
    putRequest.completed = this.is_completed;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        console.log(response);
        this.standardResponse = response;

        if (this.standardResponse.code === 'AM0000') {
          this._notification.success(this.container_name, 'Updated');
          // this.getContainer();
        } else {
          this._notification.error('Error', this.errorUpdate);
        }
      },
      error => {
        this.errorMessage = <any>error;
        console.log(this.errorMessage);
        this._notification.error('Error', this.errorUpdate);
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
              this.container = <IC0014>JSON.parse(this.apiResponse.container.json);
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
        console.log(this.errorMessage);
        this._notification.error('Error', this.errorGet);
      });
  }

  open(isnew, position, content) {
    this.show_alert = false;
    this.clearInputs();

    if(isnew){
        this.title_modal = "Add New Pre ACT";
        this.index = -1;
    }else{
    this.title_modal = "Update Pre ACT";
    this.index = position;
    }

    if(position >= 0){
        let pre_act = this.container.pre_act[position];
        this.english = pre_act.english;
        this.math = pre_act.math;
        this.reading = pre_act.reading;
        this.science = pre_act.science;
        this.essay = pre_act.essay;
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

  clearInputs(): void{
    this.english = "";
    this.math = "";
    this.reading = "";
    this.science = "";
    this.essay = "";
  }

  save_pre_act(content):boolean{
    this.show_alert = false;
    
    if(this.FieldValidation()){
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.index >= 0){
        this.container.pre_act[this.index].english = this.english;
        this.container.pre_act[this.index].math = this.math;
        this.container.pre_act[this.index].reading = this.reading;
        this.container.pre_act[this.index].science = this.science;
        this.container.pre_act[this.index].essay = this.essay;
        this.container.pre_act[this.index].total = this.total;
      }else{
        this.container.pre_act.push({
          total: this.total,
          english: this.english,
          math : this.math,
          reading: this.reading,
          science: this.science,
          essay: this.essay,
        });
      }

      this.updateContainer();

      //Se limpian las variables una vez ingresado el objeto
      this.clearInputs();
      return true;
    }
    else
      return false;
  }

  FieldValidation():boolean{
    if(this.english != ""){
      if(+this.english < 1 || +this.english > 36){
        this.show_alert = true;
        this.errorMessage = "English is out of range";
        return false;
      }
    }

    if(this.math != ""){
      if(+this.math < 1 || +this.math > 36){
        this.show_alert = true;
        this.errorMessage = "Field Math is out of range";
        return false;
      }
    }

    if(this.reading != ""){
      if(+this.reading < 1 || +this.reading > 36){
        this.show_alert = true;
        this.errorMessage = "Field Reading is out of range";
        return false;
      }
    }

    if(this.science != ""){
      if(+this.science < 1 || +this.science > 36){
        this.show_alert = true;
        this.errorMessage = "Field Science is out of range";
        return false;
      }
    }

    if(this.essay != ""){
      if(+this.essay < 2 || +this.essay > 12){
        this.show_alert = true;
        this.errorMessage = "Field Essay is out of range";
        return false;
      }
    }

    if(this.total != ""){
      if(+this.total < 1 || +this.total > 36){
        this.show_alert = true;
        this.errorMessage = "Field Total is out of range";
        return false;
      }
    }

    return true;
  }

  removeItem(position):void{
    var element = document.getElementById("pre_act-"+position).classList.add("remove-item");

    setTimeout(() => {
      this.container.pre_act.splice(position, 1);
      this.updateContainer();
    }, 600);
  }
}