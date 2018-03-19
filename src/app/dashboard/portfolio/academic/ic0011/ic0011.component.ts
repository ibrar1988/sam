import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0011 } from 'core/interfaces/Portfolio/Academic/IC0011';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0011',
  templateUrl: './ic0011.component.html',
  styleUrls: ['./ic0011.component.css']
})
export class IC0011Component implements OnInit, OnChanges, OnDestroy {

  errorMessage: string;
  container_id = '4ec716da-1dc7-4482-a612-680c6ece4c6f';
  container_name = 'PSAT NMSQT';
  errorGet = 'Cannot Get ' + this.container_name;
  errorUpdate = 'Cannot Update ' + this.container_name;
  @Input() container: IC0011;
  @Output() EventOutput: EventEmitter<IC0011> = new EventEmitter<IC0011>();
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
    putRequest.container_code = 'IC0011';
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
              this.container = <IC0011>JSON.parse(this.apiResponse.container.json);
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
        this.title_modal = "Add New PSAT NMSQT";
        this.index = -1;
    }else{
    this.title_modal = "Update PSAT NMSQT";
    this.index = position;
    }

    if(position >= 0){
        let psat_nmsqt = this.container.psat_nmsqt[position];
        this.evidence_based = psat_nmsqt.evidence_based;
        this.reading = psat_nmsqt.reading;
        this.writing_language = psat_nmsqt.writing_language;
        this.math = psat_nmsqt.math;
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
  }

  save_psat_nmsqt(content):boolean{
    this.show_alert = false;

    if(this.FieldsValidation()){
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.index >= 0){
        this.container.psat_nmsqt[this.index].evidence_based = this.evidence_based;
        this.container.psat_nmsqt[this.index].reading = this.reading;
        this.container.psat_nmsqt[this.index].writing_language = this.writing_language;
        this.container.psat_nmsqt[this.index].math = this.math;
      }else{
        this.container.psat_nmsqt.push({
          evidence_based: this.evidence_based,
          reading: this.reading,
          writing_language: this.writing_language,
          math: this.math,
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
    if(+this.evidence_based < 160 || +this.evidence_based > 760){
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
    if(+this.reading < 8 || +this.reading > 38){
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
    if(+this.writing_language < 8 || +this.writing_language > 38){
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
    if(+this.math < 160 || +this.math > 760){
      this.show_alert = true;
      this.errorMessage = "Math is out of range";
      return false;
    }
  }
    return true;
  }

  removeItem(position):void{
    var element = document.getElementById("psat_nmsqt-"+position).classList.add("remove-item");

    setTimeout(() => {
      this.container.psat_nmsqt.splice(position, 1);
      this.updateContainer();
    }, 600);
  }
}