import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0015 } from 'core/interfaces/Portfolio/Academic/IC0015';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0015',
  templateUrl: './ic0015.component.html',
  styleUrls: ['./ic0015.component.css']
})
export class IC0015Component implements OnInit, OnChanges, OnDestroy {

  errorMessage: string;
  container_id = 'ec771df8-2daf-462b-a980-8450060f646b';
  container_name = 'act'
  @Input() container: IC0015;
  @Output() EventOutput: EventEmitter<IC0015> = new EventEmitter<IC0015>();
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
    putRequest.container_code = 'IC0015';
    putRequest.json = json;
    putRequest.completed = this.is_completed;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        console.log(response);
        this.standardResponse = response;

        if (this.standardResponse.code === 'AM0000') {
          this._notification.success(this.container_name + ' Updated', '');
          // this.getContainer();
        } else {
          this._notification.error('Error Updating Container', 'Container not updated');
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error Updating Container', this.errorMessage);
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
              this.container = <IC0015>JSON.parse(this.apiResponse.container.json);
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          this._notification.error('Error Getting Container', 'Container not updated');
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error login', this.errorMessage);
      });
  }

  open(isnew, position, content) {
    this.show_alert = false;
    this.clearInputs();

    if(isnew){
        this.title_modal = "Add New ACT";
        this.index = -1;
    }else{
    this.title_modal = "Update ACT";
    this.index = position;
    }

    if(position >= 0){
        let ACT = this.container.act[position];
        this.english = ACT.english;
        this.math = ACT.math;
        this.reading = ACT.reading;
        this.science = ACT.science;
        this.essay = ACT.essay;
        this.total = ACT.total;
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

  save_act(content):boolean{
    this.show_alert = false;
    if(this.FieldValidation()){
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.index >= 0){
        this.container.act[this.index].english = this.english;
        this.container.act[this.index].math = this.math;
        this.container.act[this.index].reading = this.reading;
        this.container.act[this.index].science = this.science;
        this.container.act[this.index].essay = this.essay;
        this.container.act[this.index].total = this.total;
      }else{
        this.container.act.push({
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
    var element = document.getElementById("act-"+position).classList.add("remove-item");

    setTimeout(() => {
      this.container.act.splice(position, 1);
      this.updateContainer();
    }, 600);
  }
}