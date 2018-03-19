import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0020 } from 'core/interfaces/Portfolio/Academic/IC0020';
import { IC0037 } from 'core/interfaces/Portfolio/Academic/IC0037';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0020',
  templateUrl: './ic0020.component.html',
  styleUrls: ['./ic0020.component.css']
})
export class IC0020Component implements OnInit, OnChanges, OnDestroy {
  public value = false;
  container_tooltip = "Tell us what languages you speak and what level of proficiency you have achieved. As the world is becoming more global, the command of foreign languages is a useful and appreciated skill.";
  container_name= "Language Skills";

  errorMessage: string;
  container_id = 'f62507af-42fd-4601-b3d9-a3a46454b1d7';
  @Input() container: IC0020;
  @Output() EventOutput: EventEmitter<IC0020> = new EventEmitter<IC0020>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  is_completed: boolean;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  hideProf: boolean;
  show_alert: boolean;
  grade_position: number;
  course_position: number;
  is_new: boolean;
  catalog: IC0037;


  //Variables de entidad
  language: string;
  proficiency: string;

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
    putRequest.container_code = 'IC0020';
    putRequest.completed = this.is_completed;
    putRequest.json = json;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        console.log(response);
        this.standardResponse = response;

        if (this.standardResponse.code === 'AM0000') {
          this._notification.success(this.container_name + ' Updated', '');
        } else {
          this._notification.error('Error Updating '+ this.container_name + ' Container', 'Container not updated');
          this.getContainer();
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
              this.container = <IC0020>JSON.parse(this.apiResponse.container.json);
              this.catalog = new IC0037();
              
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
  updateLang(event)
  {
    if(event==="Others")
    {
    this.hideProf=true;
    console.log(event);
    }
    else
    {
      this.hideProf=false;
      console.log(event);
    }
  }

  open(isnew, grade_index, course_index, content) {
    this.clearInputs();
    if(isnew){
        this.title_modal = "Add New Language";
        this.is_new = true;
    }
    else
    {
      this.title_modal = "Update Language";
      this.is_new = false;
      let property = this.container.languages[grade_index].properties[course_index];
      this.language = property.language;
      this.proficiency = property.proficiency;
    }

    this.grade_position = grade_index;
    this.course_position = course_index;
    
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
    this.language = "";
    this.proficiency = "";
  }

  save_languages(content):boolean{
    this.FieldValidation();

    if(this.container.languages[this.grade_position].properties == undefined){
      this.container.languages[this.grade_position].properties = new Array(0);
    }

    //Se ingresa la info obtenida del modal al listado de profesiones
    if(this.is_new){
      this.container.languages[this.grade_position].properties.push({
        language: this.language,
        proficiency: this.proficiency,
      });
    }
    else{
      this.container.languages[this.grade_position].properties[this.course_position].language = this.language;
      this.container.languages[this.grade_position].properties[this.course_position].proficiency = this.proficiency;
    }

    this.updateContainer();

    //Se limpian las variables una vez ingresado el objeto
    this.clearInputs();
    return true;
  }

  FieldValidation():void{
    
  }

  remove_languages(grade_index, course_index):void{
    setTimeout(() => {
      this.container.languages[grade_index].properties.splice(course_index, 1);
      this.updateContainer();
    }, 600);
  }
}
