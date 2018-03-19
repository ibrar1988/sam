import { Component, OnInit, OnChanges, OnDestroy, Input, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IC0008 } from 'core/interfaces/Portfolio/Academic/IC0008';
import { IC0037 } from 'core/interfaces/Portfolio/Academic/IC0037';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule } from '@angular/forms';
import { UserPortfolioService } from 'core/services/Portofolio/userPortfolio.service';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { DateAdapter } from '@angular/material';
import { Scale } from 'app/dashboard/portfolio/academic/ic0016/scale';
import { Grade } from 'app/dashboard/portfolio/academic/ic0016/grade';
import { environment } from 'environments/environment';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { PortfolioComponent } from 'app/dashboard/portfolio/portfolio.component';

@Component({
  selector: 'app-ic0008',
  templateUrl: './ic0008.component.html',
  styleUrls: ['./ic0008.component.css']
})
export class IC0008Component implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  isGrades = false;
  public value = false;
  container_tooltip = "Tell us what schools you attended and when. You will include it in your college application portfolio.";
  container_name = "Current School";
  errorGet = 'Cannot Get ' + this.container_name;
  errorUpdate = 'Cannot Update ' + this.container_name;
  errorMessage: string;
  container_id = '88b32812-0aa5-4a20-a371-517d41dc6647';
  @Input() container: IC0008;
  @Output() EventOutput: EventEmitter<string> = new EventEmitter<string>();
  private apiResponse: IUserPortfolioContainerResponse;
  private standardResponse: IStandardResponse;
  valuetest: number;
  closeResult: string;
  title_modal: string;
  schoolImageDefault: string;
  show_alert: boolean;
  is_completed: boolean;
  instagram_url_default: string = "https://www.instagram.com/";
  linkedin_url_default: string = "https://www.linkedin.com/";
  twitter_url_default: string = "https://twitter.com/";
  facebook_url_default: string = "https://www.facebook.com/";
  catalog: IC0037;
  in_progress_change: Boolean;
  max_date: Date;
  MaxDate: Date;
  MinDate: Date = new Date();
  scale_type: string = "1";
  private uploadUrl;

  //Variables de entidad
  school_name: string;
  district: string;
  school_type: string;
  url_image = '';
  facebook_url = '';
  twitter_url = '';
  linkedin_url = '';
  instagram_url = '';
  grade: string;
  start_date: Date;
  end_date: string;
  in_progress: Boolean;
  overall_gpa: string;
  academic_gpa: string;
  class_rank: string;

  scales: Array<Scale> = [];
  sgrades: Array<Grade> = [];
  sgrade: string;

  //Variables de entidad
  course: string;
  score: string;

  prefix = '/ 4.0';
  max: string = "4";
  header: any;

  file: File;
  http: any;
  cropperSettings: CropperSettings;

  data: any;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(private _service: UserPortfolioService,
              private _notification: NotificationsService,
              private modalService: NgbModal,
              dateAdapter: DateAdapter<Date>,
              private _http: HttpClient) {
    dateAdapter.setLocale('en-US');

    //Cropper Settings
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.fileType = 'image/jpeg';
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth =150;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 220;
    this.cropperSettings.canvasHeight = 220;

    this.data = {};
  }
  formatDate(flag) {
    var d = new Date();
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      if(flag==1){
       var year = d.getFullYear()-40;
      }else{
      var  year = d.getFullYear()+5;
      }
        

    
    return new Date([year, month, day].join('-'));
}

  getStartDate()
  {
    var d = new Date();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear() - 1;
  
    return new Date([year, "Jan", "9"].join('-'));
  }

  getEndDate() {
    var d = new Date();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    return new Date([year, "Jan", "6"].join('-'));
  }

  ngOnInit() {
    this.MaxDate = this.formatDate(2);
    this.MinDate = this.formatDate(1);
    this.getContainer();
    this.initGrades();
    this.initScales();
    this.header = [{ header: 'Authorization', value: 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken }];
    this.uploadUrl = environment.apiUrlPrefix + 'storage/upload/v2/ACADEMIC';
  }

  ngOnChanges() { //On @Input property changes
  }

  ngOnDestroy() {
  }

  @ViewChild('input-file') el: ElementRef;
  @ViewChild('input-file-trigger') button: ElementRef;
  @ViewChild('file-return') the_return: ElementRef;

  ngAfterViewInit(): void {
    document.querySelector("html").classList.add('js');
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
      return this.score = '4';
    }
    if (value >= 93 && value <= 96) {
      return this.score = '4';
    }
    if (value >= 90 && value <= 92) {
      return this.score = '3.7';
    }
    if (value >= 87 && value <= 89) {
      return this.score = '3.3';
    }
    if (value >= 83 && value <= 86) {
      return this.score = '3';
    }
    if (value >= 80 && value <= 82) {
      return this.score = '2.7';
    }
    if (value >= 77 && value <= 79) {
      return this.score = '2.3';
    }
    if (value >= 73 && value <= 76) {
      return this.score = '2';
    }
    if (value >= 70 && value <= 72) {
      return this.score = '1.7';
    }
    if (value >= 67 && value <= 69) {
      return this.score = '1.3';
    }
    if (value >= 65 && value <= 66) {
      return this.score = '1';
    }
    if (value <= 65) {
      return this.score = '0';
    }
  }

  from5Scale(value) {
    value = Number(value);
    if (value >= 1) {
      this.score = String((value - 1).toFixed(2));
    } else {
      this.score = '0';
    }
    return this.score;
  }

  fromLetterGrade(value) {
    value = Number(value);
    switch (value) {
      case 1:
        return this.score = '4';

      case 2:
        return this.score = '4';

      case 3:
        return this.score = '3.7';

      case 4:
        return this.score = '3.3';

      case 5:
        return this.score = '3';

      case 6:
        return this.score = '2.7';

      case 7:
        return this.score = '2.3';

      case 8:
        return this.score = '2';

      case 9:
        return this.score = '1.7';

      case 10:
        return this.score = '1.3';

      case 11:
        return this.score = '1';

      case 12:
        return this.score = '0';

    }
  }

  updateContainer() {
    this.is_completed = true;
    var reg = /"/g;

    let json = JSON.stringify(this.container);
    //alert(json);
    //console.log(json);
    let putRequest = new UserPortfolioContainerPutRequest();
    putRequest.container_id = this.container_id;
    putRequest.container_code = 'IC0008';
    putRequest.json = json;
    putRequest.completed = this.is_completed;
    this._service.putPortfolioContainer(putRequest)
      .subscribe(response => {
        console.log(response);
        this.standardResponse = response;

        if (this.standardResponse.code === 'AM0000') {
          this._notification.success('Success', this.container_name + ' Updated');

          //se envia el grado al parent component
          this.EventOutput.emit(this.container.grade);

        } else {
          this._notification.error('Error', this.errorUpdate);
          this.getContainer();
        }
      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error', this.errorUpdate);
      });
  }
  assign() {
    //this.valuetest = this.container.comment.length;
  }

  save_school(): void {
    if (this.container.in_progress) {
      this.container.end_date = null;
    }

    //Se actualiza el current user del local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.grade = this.container.grade;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));


    this.updateContainer();
  }

  set_url_image_school():boolean {
    this.container.url_image = this.url_image;
    return true;
  }


  setGPAScores(): boolean{
    this.show_alert = false;
    if (this.scale_type == '1'){

      this.container.overall_gpa = parseFloat(this.container.overall_gpa);
      this.container.overall_gpa = this.container.overall_gpa.toFixed(2);
      let overall_gpa = +this.container.overall_gpa;
      if(overall_gpa < 0)
      {
        this.show_alert = true;
        this.errorMessage = "Overall GPA not allowed to be negative value";
        this.container.overall_gpa = '0';
        return false;
      }
      if(overall_gpa > 4){
        this.show_alert = true;
        this.errorMessage = "Overall GPA is out of range";
        this.container.overall_gpa = '0';
        return false;
      }

      this.container.academic_gpa = parseFloat(this.container.academic_gpa);
      this.container.academic_gpa = this.container.academic_gpa.toFixed(2);
      let academic_gpa = +this.container.academic_gpa;

      if(academic_gpa < 0)
      {
        this.show_alert = true;
        this.errorMessage = "Academic GPA not allowed to be negative value";
        this.container.academic_gpa = '0';
        return false;
      }
      if(academic_gpa > 4){
        this.show_alert = true;
        this.errorMessage = "Academic GPA is out of range";
        this.container.academic_gpa = '0';
        return false;
      }
    }
    if (this.scale_type == '2') {
      this.container.overall_gpa = this.from5Scale(this.container.overall_gpa);
      let overall_gpa = +this.container.overall_gpa;
      if(overall_gpa > 5){
        this.show_alert = true;
        this.errorMessage = "Overall GPA is out of range";
        return false;
      }

      this.container.academic_gpa = this.from5Scale(this.container.academic_gpa);
      let academic_gpa = +this.container.academic_gpa;
      if(academic_gpa > 5){
        this.show_alert = true;
        this.errorMessage = "Academic GPA is out of range";
        return false;
      }
    }
    if (this.scale_type == '3') {
      this.container.overall_gpa = this.fromPercentile(this.container.overall_gpa);
      let overall_gpa = +this.container.overall_gpa;
      if(overall_gpa > 100){
        this.show_alert = true;
        this.errorMessage = "Overall GPA is out of range";
        this.container.overall_gpa = '0';
        return false;
      }

      this.container.academic_gpa = this.fromPercentile(this.container.academic_gpa);
      let academic_gpa = +this.container.academic_gpa;
      if(academic_gpa > 100){
        this.show_alert = true;
        this.errorMessage = "Academic GPA is out of range";
        this.container.overall_gpa = '0';
        return false;
      }
    }
    if (this.scale_type == '4') {
      this.container.overall_gpa = this.fromLetterGrade(this.container.overall_gpa);
      this.container.academic_gpa = this.fromLetterGrade(this.container.academic_gpa);
    }

    let class_rank = +this.container.class_rank;
    if(class_rank > 100){
      this.show_alert = true;
      this.errorMessage = "Class Rank is out of range";
      this.container.overall_gpa = '0';
      return false;
    }
    if (this.container.overall_gpa === null || this.container.overall_gpa === '') {
      this.container.overall_gpa = '0';
    }
    if (this.container.academic_gpa === null || this.container.academic_gpa === '') {
      this.container.academic_gpa = '0';
    }
    if (this.container.class_rank === null || this.container.class_rank === '') {
      this.container.class_rank = '0';
    }
    return true;
  }

  getContainer() {
    this.schoolImageDefault = "assets/images/home/icons7c.png";
    this._service.getPortfolioContainer(this.container_id)
      .subscribe(response => {
        this.apiResponse = response;

        if (this.apiResponse.response.code === 'AM0000') {
          if (this.apiResponse.container) {
            try {
              this.container = <IC0008>JSON.parse(this.apiResponse.container.json);

              this.max_date = this.DateFormat(new Date());
              
              // added Dafault dates on calender to select by user.
              
              this.container.start_date = this.DateFormat(this.container.start_date);
              let dateCheck = this.container.start_date.toString();
              if (dateCheck ==='Invalid Date')
              {
                this.container.start_date = this.getStartDate();
              }

              dateCheck = this.container.end_date.toString();
              if (dateCheck === '') {
                this.container.end_date = this.getEndDate();
              }
              
              this.container.end_date = this.DateFormat(this.container.end_date == null ? this.max_date : this.container.end_date);
              this.in_progress_change = (Boolean)(this.container.in_progress);
              this.catalog = new IC0037();

              // Se valida el grado actual
              if(this.container.grade == undefined || this.container.grade == "")
                this.container.grade = JSON.parse(localStorage.getItem('currentUser')).grade;

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
        this._notification.error('Error', this.errorGet);
      });
  }

  open(content) {
    this.show_alert = false;
    this.clearInputs();

    this.title_modal = "Update School";

    if (this.container != undefined) {
      this.school_name = this.container.school_name;
      this.district = this.container.district;
      this.school_type = this.container.school_type;
      this.url_image = this.container.url_image;
      this.facebook_url = this.container.facebook_url;
      this.twitter_url = this.container.twitter_url;
      this.linkedin_url = this.container.linkedin_url;
      this.instagram_url = this.container.instagram_url;
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
    this.url_image = "";
    this.facebook_url = "";
    this.twitter_url = "";
    this.linkedin_url = "";
    this.instagram_url = "";
  }

  DateFormat(date): Date {
    return new Date(date);
  }

  onChangeInProgress(event) {
    this.in_progress_change = event.checked;
  }

  onUploadFinished(event):void{
    let result = JSON.parse(event.serverResponse._body);
    if(result.response.code == "AM0000"){
      this.url_image = result.storage_url;
    }
  }

  onRemoved(event) {
    let result = JSON.parse(event.serverResponse._body);
    if(result.response.code == "AM0000"){
      this.url_image = this.schoolImageDefault;
    }
  }

  fileChangeListener($event) {
    let image: any = new Image();
    this.file = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(this.file);
  }

  fileChange() {
    const formData: FormData = new FormData();
    formData.append('image', this.data.image);
    const headers = new HttpHeaders();

    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
    const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

    this._http.post(`${this.uploadUrl}`, formData, options).map(res => res)
      .catch(error => Observable.throw(error))
      .subscribe(
      data => {
        if(data.storage_url == undefined){
          this._notification.error('Error', '');
        }
        else{
          this.container.url_image = this.url_image = data.storage_url;
          this.clearImage();
        }
      },
      error => console.log(error)
      );
  }

  clearImage() {
    this.file = null;
    this.data = null;
  }
}
