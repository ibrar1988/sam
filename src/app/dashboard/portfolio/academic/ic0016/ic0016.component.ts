import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { IC0016 } from 'core/interfaces/Portfolio/Academic/IC0016';
import { IC0037 } from 'core/interfaces/Portfolio/Academic/IC0037';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { Scale } from 'app/dashboard/portfolio/academic/ic0016/scale';
import { Grade } from 'app/dashboard/portfolio/academic/ic0016/grade';

@Component({
  selector: 'app-ic0016',
  templateUrl: './ic0016.component.html',
  styleUrls: ['./ic0016.component.css']
})
export class IC0016Component implements OnInit, OnChanges, OnDestroy {
  isGrades = false;
  public value = false;
  container_tooltip = "Provide us with your grades by course by year. College admissions officers consider candidate's transcripts to be essential in the admissions process.";
  container_name = "Transcripts";

  errorMessage: string;
  container_id = 'f8fe96a9-a75f-4b4d-808d-99d106aee549';
  @Input() container: IC0016;
  @Output() EventOutput: EventEmitter<IC0016> = new EventEmitter<IC0016>();
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
  courses: any;
  subjects: any;
  subject: any;
  scale_type: String;
  scales: Array<Scale> = [];
  grades: Array<Grade> = [];
  grade: string;



  //Variables de entidad
  course: string;
  score: string;

  prefix: string;
  max: string;

  constructor(private _service: UserPortfolioService, private _notification: NotificationsService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getContainer();
    this.initScales();
    this.initGrades();
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
        this.prefix = '/ 5.0';
        this.max = '5.0';
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
    this.addScale(2, '5.0');
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
    // this.addGrade('A+', 'A+');
    // this.addGrade('A', 'A');
    // this.addGrade('A-', 'A-');
    // this.addGrade('B+', 'B+');
    // this.addGrade('B', 'B');
    // this.addGrade('B-', 'B-');
    // this.addGrade('C+', 'C+');
    // this.addGrade('C', 'C');
    // this.addGrade('C-', 'C-');
    // this.addGrade('D+', 'D+');
    // this.addGrade('D', 'D');
    // this.addGrade('F', 'F');

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
    this.grades.push(grade);
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

  // from45Scale(value) {
  //   value = Number(value);
  //   if (value >= 0.5) {
  //     this.score = String((value - 0.5).toFixed(2));
  //   } else {
  //     this.score = '0';
  //   }

  // }

  fromLetterGrade(value) {
    value = Number(value);
    switch (value) {
      case 1:
        this.score = '4.0';
        break;
      case 2:
        this.score = '4.0';
        break;
      case 3:
        this.score = '3.7';
        break;
      case 4:
        this.score = '3.3';
        break;
      case 5:
        this.score = '3.0';
        break;
      case 6:
        this.score = '2.7';
        break;
      case 7:
        this.score = '2.3';
        break;
      case 8:
        this.score = '2.0';
        break;
      case 9:
        this.score = '1.7';
        break;
      case 10:
        this.score = '1.3';
        break;
      case 11:
        this.score = '1.0';
        break;
      case 12:
        this.score = '0.0';
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
    putRequest.container_code = 'IC0016';
    putRequest.completed = this.is_completed;
    putRequest.json = json;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        console.log(response);
        this.standardResponse = response;

        if (this.standardResponse.code === 'AM0000') {
          this._notification.success("Success", this.container_name + ' Updated');
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
              this.container = <IC0016>JSON.parse(this.apiResponse.container.json);
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

  open(isnew, grade_index, course_index, content) {
    this.subjects = new Array(0);
    for (let sub of this.catalog.subject) {
      this.subjects.push(sub);
    }
    
    this.clearInputs();
    if (isnew) {
      this.title_modal = "Add New Course";
      this.is_new = true;
    }
    else {
      this.title_modal = "Update Course";
      this.is_new = false;
      let property = this.container.transcripts[grade_index].properties[course_index];
      this.course = property.course;
      this.score = property.score;

      for(let sub of this.subjects){
        for(let crs of sub.courses){
          if(crs.description == this.course){
            this.subject = sub;
            break;
          }
        }
      }
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
      return `with: ${reason}`;
    }
  }

  clearInputs(): void {
    this.course = "";
    this.score = "";
  }

  changeGrade(code) {
    this.grade == code;
  }

  save_course(content): boolean {
    
    if (this.FieldValidation()) {

      if (this.container.transcripts[this.grade_position].properties == undefined) {
        this.container.transcripts[this.grade_position].properties = new Array(0);
      }

      if (this.scale_type == '2') {
        this.from5Scale(this.score);

      }
      if (this.scale_type == '3') {
        this.fromPercentile(this.score);

      }
      if (this.scale_type == '4') {
        
        this.fromLetterGrade(this.score);
      }

      let fix = ((Number)(this.score)).toFixed(2).toString();
      //Se ingresa la info obtenida del modal al listado de profesiones
      if(this.scale_type !== '4' || this.scale_type !== '3')
      {
      fix = parseFloat(fix).toFixed(2);
      }

      if (this.is_new) {
        this.container.transcripts[this.grade_position].properties.push({
          course: this.course,
          score: fix
        });

      }
      else {
        this.container.transcripts[this.grade_position].properties[this.course_position].course = this.course;
        this.container.transcripts[this.grade_position].properties[this.course_position].score = fix;
      }

      this.updateContainer();

      //Se limpian las variables una vez ingresado el objeto
      this.clearInputs();
      return true;
    }
    else
      return false;
  }

  FieldValidation(): boolean {
    this.show_alert = false;
    if (this.course == "" || this.course == undefined) {
      this.errorMessage = "Field course required!";
      this.show_alert = true;
      return false;
    }

    if ((this.score == "" || this.score == undefined)) {
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

    if (this.scale_type == '3'  && (Number(this.score) > 100 || Number(this.score) < 0)) {
      this.errorMessage = "Invalid score range!";
      this.show_alert = true;
      return false;
    }



    return true;
  }

  remove_course(grade_index, course_index): void {
    setTimeout(() => {
      this.container.transcripts[grade_index].properties.splice(course_index, 1);
      this.updateContainer();
    }, 600);
  }
}
