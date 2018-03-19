import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0019 } from 'core/interfaces/Portfolio/Academic/IC0019';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { Scale } from 'app/dashboard/portfolio/academic/ic0016/scale';
import { Grade } from 'app/dashboard/portfolio/academic/ic0016/grade';
import { IC0037 } from 'core/interfaces/Portfolio/Academic/IC0037';

@Component({
  selector: 'app-ic0019',
  templateUrl: './ic0019.component.html',
  styleUrls: ['./ic0019.component.css']
})
export class IC0019Component implements OnInit, OnChanges, OnDestroy {
  isGrades = false;
  scale_type: string;

  errorMessage: string;
  container_id = 'cd486f0b-cab4-4295-af61-60da3663c4e7';
  @Input() container: IC0019;
  @Output() EventOutput: EventEmitter<IC0019> = new EventEmitter<IC0019>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  is_completed: boolean;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  show_alert: boolean;
  grade_position: number;
  course_position: number;
  is_new: boolean;
  catalog: IC0037;
  school_years_ending: number[];
  container_name: string = "Honors";

  //Variables de entidad
  honor_classes: string;
  school_year: string;
  grade: string;
  score: string;

  scales: Array<Scale> = [];
  sgrades: Array<Grade> = [];
  sgrade: string;

  subjects: any;
  subject: any;


  prefix: string;
  max: string;

  constructor(private _service: UserPortfolioService, private _notification: NotificationsService,
    private modalService: NgbModal) {
      this.subjects = new IC0019().subject;
  }

  ngOnInit() {
    this.getContainer();
    this.initGrades();
    this.initScales();
    this.catalog = new IC0037();
  }
  ngOnChanges() { //On @Input property changes
  }
  ngOnDestroy() {
  }


  getPrefix() {

    switch (this.scale_type.toString()) {
      case '1':
        this.prefix = '/ 4.0';
        this.max = '4.0';
        this.isGrades = false;
        break;
      case '2':
        this.prefix = '/ 5';
        this.max = '5';
        this.isGrades = false;
        break;
      case '3':
        this.prefix = '/100 %';
        this.max = '100';
        this.isGrades = false;
        break;
      case '4':
        this.prefix = '';
        this.max = '';
        this.isGrades = true;
        break;
    }
  }

  initScales() {
    this.addScale(1, '4.0');
    this.addScale(2, '5');
    // this.addScale(3, '5.0');
    this.addScale(3, 'Percentile');
    this.addScale(4, 'Letter Grade');


  }

  addScale(code, description) {
    const scale = new Scale();
    scale.code = code;
    scale.description = description;
    this.scales.push(scale);
  }

  initGrades() {

    this.addGrade(1, 'A+');
    this.addGrade(2, 'A');
    this.addGrade(3, 'A-');
    this.addGrade(4, 'B+');
    this.addGrade(5, 'B');
    this.addGrade(6, 'B-');
    this.addGrade(7, 'C+');
    this.addGrade(8, 'C');
    this.addGrade(9, 'C-');
    this.addGrade(10, 'D+');
    this.addGrade(11, 'D');
    this.addGrade(12, 'F');

  }

  addGrade(code, description) {
    const grade = new Grade();
    grade.code = code;
    grade.description = description;
    this.sgrades.push(grade);
  }

  fromPercentile(value) {
    value = Number(value);
    if (value >= 97 && value <= 100) {
      this.score = '4';
      return;
    }
    if (value >= 93 && value <= 96) {
      this.score = '4';
      return;
    }
    if (value >= 90 && value <= 92) {
      this.score = '3.7';
      return;
    }
    if (value >= 87 && value <= 89) {
      this.score = '3.3';
      return;
    }
    if (value >= 83 && value <= 86) {
      this.score = '3';
      return;
    }
    if (value >= 80 && value <= 82) {
      this.score = '2.7';
      return;
    }
    if (value >= 77 && value <= 79) {
      this.score = '2.3';
      return;
    }
    if (value >= 73 && value <= 76) {
      this.score = '2';
      return;
    }
    if (value >= 70 && value <= 72) {
      this.score = '1.7';
      return;
    }
    if (value >= 67 && value <= 69) {
      this.score = '1.3';
      return;
    }
    if (value >= 65 && value <= 66) {
      this.score = '1';
      return;
    }
    if (value <= 65) {
      this.score = '0';
      return;
    }
  }

  from5Scale(value) {
    value = Number(value);
    if (value >= 1) {
      this.score = String((value - 1).toFixed(2));
    } else {
      this.score = '0';
    }

  }

  from45Scale(value) {
    value = Number(value);
    if (value >= 0.5) {
      this.score = String((value - 0.5).toFixed(2));
    } else {
      this.score = '0';
    }

  }

  fromLetterGrade(value) {
    value = Number(value);
    switch (value) {
      case 1:
        this.score = '4';
        break;
      case 2:
        this.score = '4';
        break;
      case 3:
        this.score = '3.7';
        break;
      case 4:
        this.score = '3.3';
        break;
      case 5:
        this.score = '3';
        break;
      case 6:
        this.score = '2.7';
        break;
      case 7:
        this.score = '2.3';
        break;
      case 8:
        this.score = '2';
        break;
      case 9:
        this.score = '1.7';
        break;
      case 10:
        this.score = '1.3';
        break;
      case 11:
        this.score = '1';
        break;
      case 12:
        this.score = '0';
        break;
    }
  }

  updateContainer() {
    this.is_completed = true;
    var reg = /"/g;
    let json = JSON.stringify(this.container);
    console.log(json);
    let putRequest = new UserPortfolioContainerPutRequest();
    putRequest.container_id = this.container_id;
    putRequest.container_code = 'IC0019';
    putRequest.completed = this.is_completed;
    putRequest.json = json;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        console.log(response);
        this.standardResponse = response;

        if (this.standardResponse.code === 'AM0000') {
          this._notification.success(this.container_name + ' Updated', '');
        } else {
          this._notification.error('Error Updating ' + this.container_name + ' Container', 'Container not updated');
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
              this.container = <IC0019>JSON.parse(this.apiResponse.container.json);
              this.GetYearUntilNow();
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

  open(isnew, grade_index, course_index, content) {
    this.clearInputs();
    if (isnew) {
      this.title_modal = "Add New Honor";
      this.is_new = true;
    }
    else {
      this.title_modal = "Update Honor";
      this.is_new = false;
      let property = this.container.honors[grade_index].properties[course_index];
      this.honor_classes = property.ap_classes;
      this.school_year = property.school_year;
      this.grade = property.grade;
      this.score = property.score;
    }

    this.grade_position = grade_index;
    this.course_position = course_index;
    for(let sub of this.subjects){
      for(let crs of sub.courses){
        if(crs.description == this.honor_classes){
          this.subject = sub;
          break;
        }
      }
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
      return `with: ${reason}`;
    }
  }

  clearInputs(): void {
    this.honor_classes = "";
    this.school_year = "";
    this.grade = "";
    this.score = "";
    this.subject = null;
  }

  save_honors(content): boolean {
    if (this.FieldValidation()) {

      if (this.container.honors[this.grade_position].properties == undefined) {
        this.container.honors[this.grade_position].properties = new Array(0);
      }

      if(this.scale_type == '1'){
        let value = Number(this.score);
        if (value >= 1) {
          this.score = String((value).toFixed(2));
        } else {
          this.score = '0';
        }
      }
      
      if (this.scale_type == '2') {
        this.from45Scale(this.score);
      }
      if (this.scale_type == '3') {

        this.fromPercentile(this.score);
      }
      if (this.scale_type == '4') {
        this.fromLetterGrade(this.sgrade);
      }


      //Se ingresa la info obtenida del modal al listado de profesiones
      if (this.is_new) {
        this.container.honors[this.grade_position].properties.push({
          ap_classes: this.honor_classes,
          school_year: this.school_year,
          grade: this.grade,
          score: this.score
        });
      }
      else {
        this.container.honors[this.grade_position].properties[this.course_position].ap_classes = this.honor_classes;
        this.container.honors[this.grade_position].properties[this.course_position].school_year = this.school_year;
        this.container.honors[this.grade_position].properties[this.course_position].grade = this.grade;
        this.container.honors[this.grade_position].properties[this.course_position].score = this.score;
      }

      this.updateContainer();

      //Se limpian las variables una vez ingresado el objeto
      this.clearInputs();
      return true;
    }
  }

  FieldValidation() {
    this.show_alert = false;

    if (this.honor_classes == "" || this.honor_classes == undefined) {
      this.errorMessage = "Honor classes is required!";
      this.show_alert = true;
      return false;
    }

    if ((this.score == "" || this.score == undefined) && (this.scale_type != '4')) {
      this.errorMessage = "Field score required!";
      this.show_alert = true;
      return false;
    }

    if (this.scale_type == '1' && (Number(this.score) > 4 || Number(this.score) < 0)) {
      this.errorMessage = "Invalid score range!";
      this.show_alert = true;
      return false;
    }

    if (this.scale_type == '2' && (Number(this.score) > 5 || Number(this.score) < 0)) {
      this.errorMessage = "Invalid score range!";
      this.show_alert = true;
      return false;
    }
    
    if (this.scale_type == '3' && (Number(this.score) > 100 || Number(this.score) < 0)) {
      this.errorMessage = "Invalid score range!";
      this.show_alert = true;
      return false;
    }
    return true;

  }

  remove_honors(grade_index, course_index): void {
    setTimeout(() => {
      this.container.honors[grade_index].properties.splice(course_index, 1);
      this.updateContainer();
    }, 600);
  }

  GetYearUntilNow(): void {
    let init_year = 2000;
    let current_year = new Date().getFullYear();
    this.school_years_ending = [];
    while (init_year <= current_year + 1) {
      this.school_years_ending.push(init_year);
      init_year++;
    }
  }
}
