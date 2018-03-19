import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0012 } from 'core/interfaces/Portfolio/Academic/IC0012';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0012',
  templateUrl: './ic0012.component.html',
  styleUrls: ['./ic0012.component.css']
})
export class IC0012Component implements OnInit, OnChanges, OnDestroy {

  errorMessage: string;
  container_id = '633fb371-547e-456c-917b-8c26793710b6';
  container_name = 'SAT';
  errorGet = 'Cannot Get ' + this.container_name;
  errorUpdate = 'Cannot Update ' + this.container_name;
  @Input() container: IC0012;
  @Output() EventOutput: EventEmitter<IC0012> = new EventEmitter<IC0012>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  show_alert: boolean;
  index: number;
  is_completed: boolean;

  //Variables de entidad
  evidence_based: string;
  reading: string;
  writing_language: string;
  math: string;
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
    putRequest.container_code = 'IC0012';
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
              this.container = <IC0012>JSON.parse(this.apiResponse.container.json);
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
        this.title_modal = "Add New SAT";
        this.index = -1;
    }else{
    this.title_modal = "Update SAT";
    this.index = position;
    }

    if(position >= 0){
        let sat = this.container.sat[position];
        this.evidence_based = sat.evidence_based;
        this.reading = sat.reading;
        this.writing_language = sat.writing_language;
        this.math = sat.math;
        this.essay = sat.essay;
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
    this.evidence_based = "";
    this.reading = "";
    this.writing_language = "";
    this.math = "";
    this.essay = "";
  }

  save_sat(content):boolean{
    this.show_alert = false;

    if(this.FieldsValidation()){
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.index >= 0){
        this.container.sat[this.index].evidence_based = this.evidence_based;
        this.container.sat[this.index].reading = this.reading;
        this.container.sat[this.index].writing_language = this.writing_language;
        this.container.sat[this.index].math = this.math;
        this.container.sat[this.index].essay = this.essay;
      }
      else
      {
        this.container.sat.push({
          evidence_based: this.evidence_based,
          reading: this.reading,
          writing_language: this.writing_language,
          math: this.math,
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

  FieldsValidation(): boolean {
    // if(this.evidence_based == "" || this.evidence_based == undefined){
    //   this.show_alert = true;
    //   this.errorMessage = "Field Evidence Based Reading & Writing required!";
    //   return false;
    // }
  if(this.evidence_based != "") {
    if(+this.evidence_based < 200 || +this.evidence_based > 800){
      this.show_alert = true;
      this.errorMessage = "Evidence Based is out of range";
      return false;
    }
  }
    // if(this.reading == "" || this.reading == undefined){
    //   this.show_alert = true;
    //   this.errorMessage = "Field Reading required!";
    //   return false;
    // }
  if(this.reading != "") {
    if(+this.reading < 10 || +this.reading > 40){
      this.show_alert = true;
      this.errorMessage = "Reading is out of range";
      return false;
    }
  }
    // if(this.writing_language == "" || this.writing_language == undefined){
    //   this.show_alert = true;
    //   this.errorMessage = "Field Writing Language required!";
    //   return false;
    // }
  if(this.writing_language != "") {
    if(+this.writing_language < 10 || +this.writing_language > 40){
      this.show_alert = true;
      this.errorMessage = "Writing Language is out of range";
      return false;
    }
  }
    // if(this.math == "" || this.math == undefined){
    //   this.show_alert = true;
    //   this.errorMessage = "Field Math required!";
    //   return false
    // }
  if(this.math != "") {
    if(+this.math < 200 || +this.math > 800){
      this.show_alert = true;
      this.errorMessage = "Math is out of range";
      return false;
    }
  }
    if(this.essay == "" || this.essay == undefined){
      this.essay = "0";
    }
    else
    {
      if(this.essay != "") {
        if(+this.essay < 2 || +this.essay > 8){
          this.show_alert = true;
          this.errorMessage = "Essay is out of range";
          return false;
        }
      }
    }

    return true;
  }

  removeItem(position):void{
    var element = document.getElementById("sat-"+position).classList.add("remove-item");

    setTimeout(() => {
      this.container.sat.splice(position, 1);
      this.updateContainer();
    }, 600);
  }
}