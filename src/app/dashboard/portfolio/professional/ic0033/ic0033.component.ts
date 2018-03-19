import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0033 } from 'core/interfaces/Portfolio/Professional/IC0033';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';

@Component({
  selector: 'app-ic0033',
  templateUrl: './ic0033.component.html',
  styleUrls: ['./ic0033.component.css']
})
export class IC0033Component implements OnInit, OnChanges, OnDestroy {
  public value = false;
  container_tooltip = "Tell us about your internships, temporary jobs, and other employment experience. It will help us provide you with better guidance in your crafting your college applications.";
  container_name= "Internships and Work Experience";

  errorMessage: string;
  container_id = '73124636-7a04-470c-b71c-bf5a5173aa5f';
  @Input() container: IC0033;
  @Output() EventOutput: EventEmitter<IC0033> = new EventEmitter<IC0033>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  role: string;
  institution_Company: string;
  from_date: Date;
  to_date: Date;
  location: string;
  description: string;
  in_progress = false;
  show_alert: boolean;
  index: number;
  is_completed: boolean;
  max_date: Date;

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
    putRequest.container_code = 'IC0033';
    putRequest.json = json;
    putRequest.completed = this.is_completed;
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
              this.container = <IC0033>JSON.parse(this.apiResponse.container.json);
              this.max_date = this.DateFormat(new Date());
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

  saveInternship(content):boolean{
    this.show_alert = false;

    if(this.role == "" || this.role == undefined){
      this.errorMessage = "Field Role required!";
      this.show_alert = true;
      return false;
    }

    if(this.institution_Company == "" || this.institution_Company == undefined){
      this.errorMessage = "Field Institution/Company required!";
      this.show_alert = true;
      return false;
    }

    if(this.from_date == null || this.from_date == undefined){
      this.errorMessage = "Field From Date required!";
      this.show_alert = true;
      return false;
    }

    if (this.in_progress) {
      this.to_date = null;
    }
    else
    {
      if(this.to_date == null || this.to_date == undefined){
        this.errorMessage = "Field To Date required!";
        this.show_alert = true;
        return false;
      }
      else
      {
        if(this.from_date > this.to_date){
          this.errorMessage = "From Date can't be greater than To Date";
          this.show_alert = true;
          return false;
        }
      }
    }

    if(this.location == "" || this.location == undefined){
      this.errorMessage = "Field Location required!";
      this.show_alert = true;
      return false;
    }

    if(this.description == "" || this.description == undefined){
      this.errorMessage = "Field Description required!";
      this.show_alert = true;
      return false;
    }

    if(!this.show_alert){
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.index >= 0){
        this.container.internships[this.index].role = this.role;
        this.container.internships[this.index].institution_Company = this.institution_Company;
        this.container.internships[this.index].from_date = this.from_date.toDateString();
        this.container.internships[this.index].to_date = this.to_date != null ? this.to_date.toDateString() : null;
        this.container.internships[this.index].location = this.location;
        this.container.internships[this.index].description = this.description;
        this.container.internships[this.index].in_progress = this.in_progress;
      }
      else
      {
        this.container.internships.push({
          role: this.role,
          institution_Company:this.institution_Company,
          from_date: this.from_date.toDateString(),
          to_date: (this.to_date != null ? this.to_date.toDateString() : null), 
          location:this.location,
          description:this.description,
          in_progress: this.in_progress
        });
      }

      this.updateContainer();
      
      //Se limpian las variables una vez ingresado el objeto
      this.CleanInputs();
      return true;
    }
  }

  removeItem(position):void{
    var element = document.getElementById("i-tag-"+position).classList.add("remove-item");

    setTimeout(() => {
      this.container.internships.splice(position, 1);
      this.updateContainer();
    }, 600);
  }

  open(isnew, position,content) {
    this.show_alert = false;
    this.in_progress = false;
    this.CleanInputs();

    if(isnew){
      this.title_modal = "Add New Internship";
      this.index = -1;
    }else{
      this.title_modal = "Update Internship";
      this.index = position;
    }

    if(position >= 0){
      let internship = this.container.internships[position];
      this.role = internship.role;
      this.institution_Company = internship.institution_Company;
      this.from_date = new Date(internship.from_date);
      this.to_date = internship.to_date == null ? null : new Date(internship.to_date);
      this.location = internship.location;
      this.description = internship.description;
      this.in_progress = internship.in_progress;
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

  private CleanInputs(): void{
    this.role = "";
    this.institution_Company = "";
    this.from_date = null;
    this.to_date = null;
    this.location = "";
    this.description = "";
    this.in_progress = false;
  }

  DateFormat(date): Date {
    return new Date(date);
  }

  DateFormatToString(date, in_progress): string {
    let new_format: string;
    if(date == "" || date == null){
      if(!(Boolean)(in_progress))
        new_format = "MM/DD/YYYY";
      else
        new_format = "Present";
    }
    else{
      let new_date = new Date(date);
      new_format = (new_date.getMonth()+1) + "/" + (new_date.getDate()) + "/" + new_date.getFullYear();
    }
    return new_format;
  }

  onChangeInProgress(event) {
    this.in_progress = event.checked;
  }
}
